import formidable from 'formidable'
import fs from 'fs'
import Arweave from 'arweave'
import { Configuration, OpenAIApi } from 'openai'
import nodemailer from 'nodemailer'

export const config = {
  api: {
    bodyParser: false,
  },
}

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
})

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}))

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to process form' })
    }

    const file = files.file
    const title = fields.title
    const signatories = fields.signatories.split(',').map(email => email.trim())

    try {
      // Read file
      const data = fs.readFileSync(file.filepath)

      // Upload to Arweave
      const transaction = await arweave.createTransaction({ data: data })
      transaction.addTag('Content-Type', file.mimetype || 'application/octet-stream')
      transaction.addTag('Title', title)

      await arweave.transactions.sign(transaction)
      const response = await arweave.transactions.post(transaction)

      if (response.status !== 200) {
        throw new Error('Failed to upload to Arweave')
      }

      const url = `https://arweave.net/${transaction.id}`

      // Generate AI summary
      const summary = await generateSummary(data.toString())

      // Send email notifications
      await sendNotifications(signatories, title, url, summary)

      res.status(200).json({ url })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to process document' })
    }
  })
}

async function generateSummary(text) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Please summarize the following document:\n\n${text}\n\nSummary:`,
    max_tokens: 150,
  })

  return response.data.choices[0].text || 'Unable to generate summary.'
}

async function sendNotifications(emails, title, url, summary) {
  for (const email of emails) {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `You've been invited to sign: ${title}`,
      html: `
        <h1>You've been invited to sign a document</h1>
        <p>Document: ${title}</p>
        <p>URL: <a href="${url}">${url}</a></p>
        <h2>Document Summary:</h2>
        <p>${summary}</p>
        <p>Please review and sign the document at your earliest convenience.</p>
      `,
    })
  }
}