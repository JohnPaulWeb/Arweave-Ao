import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { FileText, Check } from 'lucide-react'

export default function Document() {
  const router = useRouter()
  const { id } = router.query
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (id) {
      fetchDocument()
    }
  }, [id])

  const fetchDocument = async () => {
    try {
      const response = await fetch(`https://arweave.net/${id}`)
      if (response.ok) {
        const data = await response.text()
        setDocument({ id, content: data })
      } else {
        throw new Error('Failed to fetch document')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
    

  const handleSign = async () => {
   
    toast({
      title: "Signed",
      description: "Document has been signed successfully.",
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!document) {
    return <div>Document not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Document Viewer</CardTitle>
          <CardDescription>View and sign the document</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-md">
            <pre className="whitespace-pre-wrap">{document.content}</pre>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.print()}>
            <FileText className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button onClick={handleSign}>
            <Check className="mr-2 h-4 w-4" /> Sign Document
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}