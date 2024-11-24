'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArweaveWebWallet } from 'arweave-wallet-connector'

export default function Sign() {
  const [documents, setDocuments] = useState([])
  const [newDocument, setNewDocument] = useState({ title: '', content: '' })
  const [wallet, setWallet] = useState(null)

  useEffect(() => {
    const arweaveWallet = new ArweaveWebWallet({
      name: 'DocumentSign',
      logo: 'https://example.com/logo.png'
    })
    arweaveWallet.setUrl('arweave.app')
    setWallet(arweaveWallet)
  }, [])

  const connectWallet = async () => {
    try {
      await wallet.connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const createDocument = async () => {
    if (!wallet.address) {
      alert('Please connect your Arweave wallet first.')
      return
    }

    try {
      const transaction = await wallet.createTransaction({
        data: JSON.stringify(newDocument)
      })
      transaction.addTag('Content-Type', 'application/json')
      transaction.addTag('App-Name', 'DocumentSign')

      await wallet.signTransaction(transaction)
      await wallet.postTransaction(transaction)

      setDocuments([...documents, { ...newDocument, id: transaction.id }])
      setNewDocument({ title: '', content: '' })
    } catch (error) {
      console.error('Failed to create document:', error)
    }
  }

  const signDocument = async (documentId) => {
    if (!wallet.address) {
      alert('Please connect your Arweave wallet first.')
      return
    }

    try {
      const transaction = await wallet.createTransaction({
        data: JSON.stringify({ action: 'sign', documentId })
      })
      transaction.addTag('Content-Type', 'application/json')
      transaction.addTag('App-Name', 'DocumentSign')
      transaction.addTag('Action', 'Sign')
      transaction.addTag('Document-ID', documentId)

      await wallet.signTransaction(transaction)
      await wallet.postTransaction(transaction)

      alert('Document signed successfully!')
    } catch (error) {
      console.error('Failed to sign document:', error)
    }
  }

  const summarizeDocument = async (content) => {
    const response = await fetch('/Api/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    const data = await response.json()
    return data.summary
  }

  const sendNotification = async (to, subject, text) => {
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, text }),
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DocumentSign on Arweave</h1>
      <Button onClick={connectWallet} className="mb-4">
        {wallet?.address ? `Connected: ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Connect Arweave Wallet'}
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Document</CardTitle>
          <CardDescription>Enter the details of your new document</CardDescription>
        </CardHeader>
        <CardContent> 
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newDocument.title}
                onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newDocument.content}
                onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={createDocument}>Create Document</Button>
        </CardFooter>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
      {documents.map((doc) => (
        <Card key={doc.id} className="mb-4">
          <CardHeader>
            <CardTitle>{doc.title}</CardTitle>
            <CardDescription>ID: {doc.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{doc.content}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => signDocument(doc.id)} className="mr-2">Sign Document</Button>
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(`https://arweave.net/${doc.id}`)}>
              Copy Link
            </Button>
            <Button variant="secondary" onClick={async () => {
              const summary = await summarizeDocument(doc.content)
              alert(`Summary: ${summary}`)
            }}>
              Summarize
            </Button>
            <Button variant="secondary" onClick={() => sendNotification('user@example.com', 'Document Signed', `The document "${doc.title}" has been signed.`)}>
              Send Notification
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}