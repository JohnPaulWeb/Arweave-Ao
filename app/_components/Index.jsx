"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DocumentCard from '../_components/DocumentCard';
import UploadModal from '../_components/UploadModal';

const Index = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: '1',
      title: 'Sample Contract.pdf',
      status: 'pending',
      signers: ['john@example.com', 'jane@example.com'],
      createdAt: new Date().toISOString(),
    }
  ]); 

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">DocumentSign</h1>
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-primary hover:bg-primary-600"
          >
            <Plus className="mr-2 h-4 w-4" /> New Document
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard 
              key={doc.id} 
              document={doc} 
              onDelete={handleDeleteDocument}
            />
          ))}
        </div>

        <UploadModal 
          isOpen={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)} 
          onUpload={(doc) => {
            setDocuments([...documents, doc]);
            setIsUploadModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default Index;