import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  try {
    const { url } = await req.json()

    // TODO: Implement actual document fetching from Arweave
    const documentContent = `This is a sample document content that would be fetched from ${url}. 
    The actual implementation would need to fetch the document from Arweave and extract its content.`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes legal documents and agreements concisely.'
        },
        {
          role: 'user',
          content: `Please provide a brief summary of the following document: ${documentContent}`
        }
      ],
      stream: true,
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to summarize document' },
      { status: 500 }
    )
  }
}