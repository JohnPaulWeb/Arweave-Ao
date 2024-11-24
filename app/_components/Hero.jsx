import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import AgreementList from "../_components/AgreementList"
import CreateAgreementModal from "../_components/CreateAgreementModal"

export default function Hero() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ArweaveDocumentSign</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Your Agreements</h2>
        <CreateAgreementModal>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> New Agreement
          </Button>
        </CreateAgreementModal>
      </div>
      <AgreementList />
    </div>
  )
}