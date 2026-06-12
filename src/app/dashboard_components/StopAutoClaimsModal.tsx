import { XCircle, AlertTriangle, ShieldOff, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface StopAutoClaimsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function StopAutoClaimsModal({ isOpen, onClose, onConfirm }: StopAutoClaimsModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onConfirm();
      onClose();
      setShowSuccess(false);
      setIsConfirmed(false);
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setIsConfirmed(false);
    setShowSuccess(false);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-[480px] p-0 gap-0">
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Auto-Claims Stopped
            </h3>
            <p className="text-sm text-slate-600">
              No further claims will be automatically submitted to your insurance
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[560px] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <ShieldOff className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-slate-900">
                Stop Auto-Claims to Insurance
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600 mt-1">
                Prevent automatic claim submissions from your account
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-5">
          {/* Warning Alert */}
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900 mb-2">
                  Important: What This Means
                </p>
                <p className="text-sm text-red-800">
                  Stopping auto-claims will prevent any future services from being automatically 
                  submitted to your insurance provider. You will be responsible for the full cost 
                  of all future services.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Information */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              What Will Happen:
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <XCircle className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">No Insurance Claims</p>
                  <p className="text-xs text-slate-600">
                    Future sessions will not be submitted to your insurance for reimbursement
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <XCircle className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Full Payment Required</p>
                  <p className="text-xs text-slate-600">
                    You will pay the full service price instead of just your copay
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <XCircle className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Manual Submission Only</p>
                  <p className="text-xs text-slate-600">
                    You can still manually submit claims yourself to your insurance if needed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Claims Info */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Note About Existing Claims
                </p>
                <p className="text-xs text-blue-800">
                  Claims already submitted to insurance will continue to be processed normally. 
                  This only affects new services going forward.
                </p>
              </div>
            </div>
          </div>

          {/* Re-enable Information */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm font-medium text-slate-900 mb-2">
              Can I Re-enable Auto-Claims Later?
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Yes, you can re-enable automatic claims submission at any time by contacting our 
              support team or through your account settings. Your insurance information will be 
              safely stored and ready to use when you're ready.
            </p>
          </div>

          {/* Confirmation Checkbox */}
          <div className="pt-4 border-t border-slate-200">
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox 
                checked={isConfirmed} 
                onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
                className="mt-0.5"
              />
              <span className="text-sm text-slate-700 leading-relaxed">
                I understand that stopping auto-claims means I will be responsible for the full 
                cost of future services and that claims will not be submitted to my insurance 
                automatically.
              </span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleConfirm}
            disabled={!isConfirmed}
          >
            <ShieldOff className="w-4 h-4 mr-2" />
            Stop Auto-Claims
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
