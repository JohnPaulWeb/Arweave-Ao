import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Share2, CheckCircle, Clock, Trash2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { toast } from "sonner";

const DocumentCard = ({ document, onDelete }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const copyLink = () => {
    const url = `https://arweave.net/${document.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleDelete = () => {
    onDelete(document.id);
    toast.success("Document deleted successfully!");
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-primary mr-3" />
          <div>
            {/* <h3 className="font-medium text-gray-900">{document.title}</h3>
            <p className="text-sm text-gray-500">
              Created {formatDistanceToNow(new Date(document.createdAt))} ago
            </p> */}
          </div>
        </div>
        {/* {getStatusIcon(document.status)} */}
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Signers:</p>
        <div className="space-y-1">
          {/* {document.signers.map((signer, index) => (
            <div key={index} className="text-sm text-gray-500 flex items-center">
              <div className="w-2 h-2 rounded-full bg-primary mr-2" />
              {signer}
            </div>
          ))} */}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyLink}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
        <Button variant="default" size="sm">
          View Document
        </Button>
      </div>
    </Card>
  );
};

export default DocumentCard;