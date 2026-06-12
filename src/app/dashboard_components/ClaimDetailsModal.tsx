import { X, Download, Printer, Phone, Send, FileText, User, Calendar, Clock, DollarSign, Shield, AlertCircle, CheckCircle2, RefreshCw, CreditCard, Package, XCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { FileAppealModal } from "./FileAppealModal";

interface Claim {
  claimId: string;
  service: string;
  provider: string;
  claimAmount: number;
  submittedDate: string;
  status: "Denied" | "Eligible" | "In Process" | "Not Started";
  denialReason?: string;
  payableAmount?: number;
  sessionType?: string;
}

interface ClaimDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim;
  onPayClick?: () => void;
  onCancelClaim?: (claimId: string) => void;
}

export function ClaimDetailsModal({ isOpen, onClose, claim, onPayClick, onCancelClaim }: ClaimDetailsModalProps) {
  const statusConfig = {
    Denied: {
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    Eligible: {
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    "In Process": {
      icon: RefreshCw,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    "Not Started": {
      icon: Clock,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
    },
  };

  const config = statusConfig[claim.status];
  const StatusIcon = config.icon;

  // Mock data - in real app this would come from props or API
  const sessionDate = "2026-03-20 11:00 AM";
  const processingTime = "1 days";
  const claimType = "Mental Health Services";
  const insuranceProvider = "Blue Cross Blue Shield";
  const memberId = "FULLY1230";
  const groupNumber = "GRP001";
  const policyHolder = "John Doe";
  
  // Calculate payment breakdown
  const totalSessionCost = claim.claimAmount;
  const hasCopay = claim.claimAmount > 150;
  const copayAmount = hasCopay ? 25 : 0;
  
  let insuranceCoverage = 0;
  let yourCopay = 0;
  let totalYouPay = 0;
  
  if (claim.status === "Denied") {
    // For denied claims, user pays full amount
    insuranceCoverage = 0;
    yourCopay = 0;
    totalYouPay = claim.payableAmount || claim.claimAmount;
  } else if (claim.status === "Eligible") {
    // For eligible claims
    if (hasCopay) {
      insuranceCoverage = totalSessionCost - copayAmount;
      yourCopay = copayAmount;
      totalYouPay = copayAmount;
    } else {
      insuranceCoverage = totalSessionCost;
      yourCopay = 0;
      totalYouPay = 0;
    }
  } else {
    // In Process - pending calculation
    insuranceCoverage = 0;
    yourCopay = hasCopay ? copayAmount : 0;
    totalYouPay = hasCopay ? copayAmount : 0;
  }

  const [isFileAppealModalOpen, setIsFileAppealModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleCancelClaim = () => {
    // Close confirmation modal
    setIsCancelModalOpen(false);
    // Close details modal
    onClose();
    // Call the onCancelClaim callback to remove the claim
    if (onCancelClaim) {
      onCancelClaim(claim.claimId);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[520px] max-h-[90vh] p-0 gap-0 flex flex-col">
          <DialogHeader className="p-6 pb-4 flex-shrink-0">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  Claim Details
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-600 mt-1">
                  Complete information about claim {claim.claimId}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 overflow-y-auto px-6" style={{ maxHeight: "calc(90vh - 200px)" }}>
            <div className="space-y-6 pb-6">
              {/* Claim Status Box */}
              <div className={`p-4 rounded-lg border-2 ${config.bg} ${config.border}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Claim Status</p>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`w-4 h-4 ${config.color}`} />
                      <span className={`text-base font-semibold ${config.color}`}>
                        {claim.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 mb-1">Claim Amount</p>
                    <p className="text-3xl font-bold text-slate-900">
                      ${claim.claimAmount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Claim Information */}
              <div>
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 mb-3">
                  <FileText className="w-4 h-4" />
                  Claim Information
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Claim ID</p>
                      <p className="text-sm font-medium text-slate-900">{claim.claimId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Date Submitted</p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(claim.submittedDate.split('/').reverse().join('-')).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Processing Time</p>
                      <p className="text-sm font-medium text-slate-900">{processingTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Claim Type</p>
                      <p className="text-sm font-medium text-slate-900">{claimType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div>
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 mb-3">
                  <Package className="w-4 h-4" />
                  Order Information
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Product</p>
                      <p className="text-sm font-medium text-slate-900">{claim.service}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Sessions</p>
                      <p className="text-sm font-medium text-slate-900">4 sessions</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Session Type</p>
                      <p className="text-sm font-medium text-slate-900 capitalize">{claim.sessionType || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Information */}
              <div>
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 mb-3">
                  <Shield className="w-4 h-4" />
                  Insurance Information
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Provider</p>
                      <p className="text-sm font-semibold text-slate-900">{insuranceProvider}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Member ID</p>
                      <p className="text-sm font-semibold text-slate-900">{memberId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Group Number</p>
                      <p className="text-sm font-semibold text-slate-900">{groupNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Policy Holder</p>
                      <p className="text-sm font-semibold text-slate-900">{policyHolder}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div>
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 mb-3">
                  <DollarSign className="w-4 h-4" />
                  Payment Breakdown
                </h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-700">Total Session Cost:</p>
                    <p className="text-sm font-semibold text-slate-900">${totalSessionCost}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-700">Insurance Coverage:</p>
                    <p className="text-sm font-semibold text-green-600">${insuranceCoverage}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-700">Your Copay:</p>
                    <p className="text-sm font-semibold text-slate-900">${yourCopay}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-300">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-semibold text-slate-900">Total You Pay:</p>
                      <p className="text-xl font-bold text-slate-900">${totalYouPay}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Denial Information - Only show if denied */}
              {claim.status === "Denied" && claim.denialReason && (
                <div>
                  <h3 className="flex items-center gap-2 text-base font-semibold text-red-600 mb-3">
                    <AlertCircle className="w-4 h-4" />
                    Denial Information
                  </h3>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200 space-y-3">
                    <div>
                      <p className="text-xs text-red-700 font-medium mb-1">Reason for Denial:</p>
                      <p className="text-sm text-red-900">{claim.denialReason}</p>
                    </div>
                    <div>
                      <p className="text-xs text-red-700 font-medium mb-2">Next Steps:</p>
                      <ul className="space-y-1.5 text-sm text-red-900">
                        <li className="flex gap-2">
                          <span className="text-red-600 mt-0.5">•</span>
                          <span>Review the denial reason with your insurance provider</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 mt-0.5">•</span>
                          <span>Gather supporting documentation (medical records, prior authorization)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 mt-0.5">•</span>
                          <span>File an appeal within 180 days of denial date</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-red-600 mt-0.5">•</span>
                          <span>Contact our support team for assistance with the appeal process</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <div className="border-t border-slate-200 p-4 bg-slate-50 flex-shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <Download size={14} />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <Printer size={14} />
                Print
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <Phone size={14} />
                Contact Support
              </Button>
              <div className="flex-1" />
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {/* Show Pay button if there's an amount to pay */}
              {totalYouPay > 0 && (
                <Button className="bg-slate-900 hover:bg-slate-800 text-white" onClick={onPayClick}>
                  <CreditCard size={14} className="mr-1.5" />
                  Pay ${totalYouPay}
                </Button>
              )}
              {/* Show File Appeal button for denied claims */}
              {claim.status === "Denied" && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsFileAppealModalOpen(true)}>
                  <Send size={14} className="mr-1.5" />
                  File Appeal
                </Button>
              )}
              {/* Show Cancel button for in process claims */}
              {claim.status === "In Process" && (
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsCancelModalOpen(true)}>
                  <XCircle size={14} className="mr-1.5" />
                  Cancel Claim
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <FileAppealModal 
        isOpen={isFileAppealModalOpen} 
        onClose={() => setIsFileAppealModalOpen(false)} 
        claimId={claim.claimId}
        denialReason={claim.denialReason || "No reason provided"}
      />
      
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="max-w-[480px] p-0 gap-0">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  Cancel Claim?
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-600 mt-1">
                  This action cannot be undone
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600">Claim ID</p>
                  <p className="text-sm font-semibold text-slate-900">{claim.claimId}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600">Service</p>
                  <p className="text-sm font-semibold text-slate-900">{claim.service}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600">Claim Amount</p>
                  <p className="text-sm font-semibold text-slate-900">${claim.claimAmount}</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900 mb-1">
                    Are you sure you want to cancel this claim?
                  </p>
                  <p className="text-xs text-red-800">
                    Canceling this claim will stop the insurance processing and you will need to submit a new claim if you want to proceed later. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsCancelModalOpen(false)}
              >
                Keep Claim
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleCancelClaim}
              >
                Yes, Cancel Claim
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
