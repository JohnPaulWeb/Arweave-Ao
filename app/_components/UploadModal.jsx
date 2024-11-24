"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Upload } from "lucide-react";

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [signers, setSigners] = useState(['']);

  const handleUpload = async () => {
    if (!file) return;

   
    const mockDocument = {
      id: Math.random().toString(36).substr(2, 9),
      title: file.name,
      status: 'pending',
      signers: signers.filter(s => s !== ''),
      createdAt: new Date().toISOString(),
    };

    onUpload(mockDocument);
  };

  const addSigner = () => {
    setSigners([...signers, '']);
  };

  const updateSigner = (index, value) => {
    const newSigners = [...signers];
    newSigners[index] = value;
    setSigners(newSigners);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New Document</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Document</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Signers</Label>
            {signers.map((signer, index) => (
              <Input
                key={index}
                type="email"
                placeholder="Email address"
                value={signer}
                onChange={(e) => updateSigner(index, e.target.value)}
              />
            ))}
            <Button type="button" variant="outline" onClick={addSigner}>
              Add Another Signer
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;