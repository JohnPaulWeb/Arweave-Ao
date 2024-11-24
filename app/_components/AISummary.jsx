'use client'

import { useState } from 'react'
import { useCompletion } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function AISummary({ url }) {
  const {
    completion,
    isLoading,
    handleSubmit,
  } = useCompletion({
    api: '/api/summarize',
    onError: (err) => {
      console.error('Error:', err)
    },
  })

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit({ url })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AI Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              'Generate Summary'
            )}
          </Button>
          
          {completion && (
            <div className="rounded-lg border bg-muted p-4">
              <h3 className="font-semibold mb-2">Summary:</h3>
              <p className="text-sm whitespace-pre-wrap">{completion}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}