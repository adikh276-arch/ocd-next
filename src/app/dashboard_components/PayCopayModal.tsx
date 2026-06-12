import { CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PayCopayModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimId: string;
  copayAmount: number;
  claimAmount: number;
}

export function PayCopayModal({ 
  isOpen, 
  onClose, 
  claimId, 
  copayAmount,
  claimAmount 
}: PayCopayModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const insuranceCovers = claimAmount - copayAmount;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16) {
      const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handlePayment = () => {
    // Handle payment submission logic here
    console.log("Processing payment for claim:", claimId);
    console.log("Copay amount:", copayAmount);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-emerald-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Pay Copay
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-slate-600 mt-2">
            Complete copay payment for claim {claimId}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Copay Amount Display */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-emerald-700 mb-2">Copay Amount</p>
              <p className="text-5xl font-bold text-slate-900 mb-1">${copayAmount}</p>
              <p className="text-sm text-emerald-600">Insurance covers ${insuranceCovers}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Payment Method <span className="text-red-600">*</span>
            </label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full bg-slate-50 border-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    <span>Credit Card</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Card Number <span className="text-red-600">*</span>
            </label>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="bg-slate-50 border-slate-300"
            />
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Cardholder Name <span className="text-red-600">*</span>
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="bg-slate-50 border-slate-300"
            />
          </div>

          {/* Expiry Date & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Expiry Date <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className="bg-slate-50 border-slate-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                CVV <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={handleCvvChange}
                className="bg-slate-50 border-slate-300"
              />
            </div>
          </div>

          {/* Security Message */}
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <ShieldCheck size={16} className="flex-shrink-0 mt-0.5" />
            <p>Your payment is secure and encrypted. We never store your full card details.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-slate-900 hover:bg-slate-800 text-white"
            onClick={handlePayment}
            disabled={!cardNumber || !cardholderName || !expiryDate || !cvv}
          >
            <CreditCard size={14} className="mr-1.5" />
            Pay ${copayAmount}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
