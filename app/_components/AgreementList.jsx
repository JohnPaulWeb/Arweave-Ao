"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyIcon, UserPlusIcon } from 'lucide-react'
import AISummary from "../_components/AISummary"

export default function AgreementList() {
  const [agreements, setAgreements] = useState([
    { id: 1, title: "Service Agreement", status: "Pending" },
    { id: 2, title: "NDA", status: "Signed" },
  ])

  const copyLink = (id) => {
    console.log(`Copying link for agreement ${id}`)
  }

  const inviteSignatory = (id) => {
    console.log(`Inviting signatory for agreement ${id}`)
  }

  return (
    <div className="space-y-4">
      {agreements.map((agreement) => (
        <div key={agreement.id} className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold">{agreement.title}</h3>
          <p className="text-sm text-gray-500">Status: {agreement.status}</p>
          <div className="mt-2 space-x-2">
            <Button size="sm" onClick={() => copyLink(agreement.id)}>
              <CopyIcon className="mr-2 h-4 w-4" /> Copy Link
            </Button>
            <Button size="sm" onClick={() => inviteSignatory(agreement.id)}>
              <UserPlusIcon className="mr-2 h-4 w-4" /> Invite Signatory
            </Button>
          </div>
          <div className="mt-4">
            <AISummary url={`https://arweave.net/${agreement.id}`} />
          </div>
        </div>
      ))}
    </div>
  )
}