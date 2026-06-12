import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard } from "lucide-react";
import { useState } from "react";
const cardIconsImage = "/dashboard_assets/962c25d1e301379977023981e8f6dccf320846f4.png";

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (cardData: any) => void;
}

export function AddPaymentMethodModal({ isOpen, onClose, onSave }: AddPaymentMethodModalProps) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [zipCode, setZipCode] = useState("");
  const [setAsDefault, setSetAsDefault] = useState(false);

  const handleSave = () => {
    const cardData = {
      cardholderName,
      cardNumber,
      expirationDate,
      securityCode,
      country,
      zipCode,
      isDefault: setAsDefault,
    };
    
    if (onSave) {
      onSave(cardData);
    }
    
    // Reset form
    setCardholderName("");
    setCardNumber("");
    setExpirationDate("");
    setSecurityCode("");
    setZipCode("");
    setSetAsDefault(false);
    
    onClose();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16) {
      // Format as 1234 1234 1234 1234
      const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
      setCardNumber(formatted);
    }
  };

  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      // Format as MM / YY
      if (value.length >= 2) {
        value = value.slice(0, 2) + " / " + value.slice(2);
      }
      setExpirationDate(value);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-center rounded-t-2xl">
                <h2 className="text-lg font-semibold text-[#020817]">Add a card</h2>
              </div>

              {/* Form */}
              <div className="px-6 py-6 space-y-4">
                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm text-[#64748B] mb-2">
                    Cardholder name
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm text-[#64748B] mb-2">
                    Card number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full px-4 py-3 pr-24 border border-[#E2E8F0] rounded-xl text-[#0F172A] text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all"
                      placeholder="1234 1234 1234 1234"
                    />
                    {/* Card Brand Icons */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <img src={cardIconsImage} alt="Card brands" className="h-5" />
                    </div>
                  </div>
                </div>

                {/* Expiration Date & Security Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#64748B] mb-2">
                      Expiration date
                    </label>
                    <input
                      type="text"
                      value={expirationDate}
                      onChange={handleExpirationDateChange}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all"
                      placeholder="MM / YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B] mb-2">
                      Security code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={securityCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 4) {
                            setSecurityCode(value);
                          }
                        }}
                        className="w-full px-4 py-3 pr-12 border border-[#E2E8F0] rounded-xl text-[#0F172A] text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all"
                        placeholder="CVC"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CreditCard size={16} className="text-[#CBD5E1]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Country & ZIP Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#64748B] mb-2">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all appearance-none bg-white cursor-pointer"
                    >
                      <option value="United States">United States</option>
                      <option value="India">India</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B] mb-2">
                      ZIP code
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] text-sm focus:outline-none focus:border-[#00c0ff] focus:ring-2 focus:ring-[#f3faff] transition-all"
                      placeholder="12345"
                    />
                  </div>
                </div>

                {/* Terms */}
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  By providing your card information, you allow Nourish to charge your card for future payments in accordance with their terms.
                </p>

                {/* Set as Default Toggle */}
                <div className="flex items-center justify-between py-3">
                  <label className="text-sm text-[#64748B] font-medium">
                    Set as default method
                  </label>
                  <button
                    onClick={() => setSetAsDefault(!setAsDefault)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      setAsDefault ? "bg-[#00c0ff]" : "bg-[#E2E8F0]"
                    }`}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: setAsDefault ? 24 : 2,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="w-full bg-[#00c0ff] hover:bg-[#00b0ef] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm"
                >
                  Save card
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
