import { X, Upload, Send } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface FileAppealModalProps {
  isOpen: boolean;
  onClose: () => void;
  denialReason: string;
  claimId: string;
}

export function FileAppealModal({ isOpen, onClose, denialReason, claimId }: FileAppealModalProps) {
  const [justification, setJustification] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = () => {
    // Handle appeal submission logic here
    console.log("Filing appeal for claim:", claimId);
    console.log("Justification:", justification);
    console.log("Files:", files);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            File Insurance Appeal
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 mt-1">
            Explain why this claim should be reconsidered. Include any relevant medical documentation or justification.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Original Denial Reason */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-xs font-medium text-red-900 mb-1">Original Denial Reason:</p>
            <p className="text-sm text-red-700">{denialReason}</p>
          </div>

          {/* Appeal Justification */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Appeal Justification <span className="text-red-600">*</span>
            </label>
            <Textarea
              placeholder="Explain why you believe this claim should be approved..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Upload Documents */}
          <div>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Upload Supporting Documents</p>
                  <p className="text-xs text-slate-600 mt-1">
                    (Medical records, prior authorization, etc.)
                  </p>
                </div>
                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                {files && files.length > 0 && (
                  <p className="text-xs text-slate-600 mt-2">
                    {files.length} file{files.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-slate-900 hover:bg-slate-800 text-white"
            onClick={handleSubmit}
            disabled={!justification.trim()}
          >
            <Send size={14} className="mr-1.5" />
            Submit Appeal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
