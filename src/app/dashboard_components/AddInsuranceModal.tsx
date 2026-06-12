import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Upload, Check, Info } from "lucide-react";
import { InsuranceNotFoundModal } from "./InsuranceNotFoundModal";

interface AddInsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INSURANCE_CARRIERS = [
  "Aetna",
  "Blue Cross Blue Shield Companies",
  "Cigna",
  "Community Health Network",
  "Devoted Health",
  "Medical Mutual of Ohio",
  "Medicare",
  "United Healthcare",
  "Insurance provider not listed (Pay out of Pocket)",
];

const RELATIONSHIPS = [
  "Self",
  "Spouse",
  "Child",
  "Parent",
  "Other",
];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
];

export function AddInsuranceModal({ isOpen, onClose }: AddInsuranceModalProps) {
  const [step, setStep] = useState(2);
  const [carrier, setCarrier] = useState("Insurance provider not listed (Pay out of Pocket)");
  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [memberId, setMemberId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [state, setState] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [relationship, setRelationship] = useState("Self");
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [frontCardFile, setFrontCardFile] = useState<File | null>(null);
  const [backCardFile, setBackCardFile] = useState<File | null>(null);
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);
  const [country, setCountry] = useState("United States");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setStep(2);
    setCarrier("Insurance provider not listed (Pay out of Pocket)");
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setMemberId("");
    setGroupId("");
    setState("");
    setRelationship("Self");
    setFrontCardFile(null);
    setBackCardFile(null);
    setShowCarrierDropdown(false);
    setShowStateDropdown(false);
    setShowRelationshipDropdown(false);
    setCountry("United States");
    setShowCountryDropdown(false);
    onClose();
  };

  const handleCarrierSelect = (selectedCarrier: string) => {
    setCarrier(selectedCarrier);
    setShowCarrierDropdown(false);
    // Automatically move to step 2 after selecting carrier
    setTimeout(() => setStep(2), 300);
  };

  const handleFileSelect = (file: File, type: "front" | "back") => {
    if (type === "front") {
      setFrontCardFile(file);
    } else {
      setBackCardFile(file);
    }
  };

  const handleSaveChanges = () => {
    // Handle form submission
    console.log({
      carrier,
      firstName,
      lastName,
      dateOfBirth,
      memberId,
      groupId,
      state,
      relationship,
      frontCardFile,
      backCardFile,
    });
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[640px] overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-[#043570] to-[#00c0ff]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    Edit Insurance Coverage
                  </h2>
                  <div className="relative w-44">
                    <button
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-left flex items-center justify-between transition-colors"
                    >
                      <span className="text-white text-sm font-medium">{country}</span>
                      <ChevronDown
                        size={16}
                        className={`text-white transition-transform ${
                          showCountryDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {showCountryDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full right-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-20"
                      >
                        {COUNTRIES.map((countryOption) => (
                          <button
                            key={countryOption}
                            onClick={() => {
                              setCountry(countryOption);
                              setShowCountryDropdown(false);
                            }}
                            className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${
                              countryOption === country
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-900 hover:bg-blue-50"
                            }`}
                          >
                            {countryOption}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Carrier Selection */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* State */}
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                          State
                          <div className="relative group">
                            <Info size={16} className="text-slate-400 cursor-help" />
                            <div className="absolute left-0 bottom-full mb-2 w-64 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-20">
                              Select the location associated with your insurance.
                              <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                            </div>
                          </div>
                        </label>
                        <div className="relative">
                          <button
                            onClick={() => setShowStateDropdown(!showStateDropdown)}
                            className="w-full px-4 py-3.5 bg-[#f3faff] border-2 border-[#00c0ff]/30 rounded-xl text-left flex items-center justify-between hover:border-[#00c0ff] transition-all group"
                          >
                            <span className="text-[#043570] font-medium">{state || "Select state"}</span>
                            <ChevronDown
                              size={18}
                              className={`text-[#00c0ff] transition-transform duration-300 ${
                                showStateDropdown ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {showStateDropdown && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#00c0ff]/30 rounded-xl shadow-xl overflow-hidden z-10"
                              >
                                <div className="max-h-[250px] overflow-y-auto">
                                  {US_STATES.map((stateOption, index) => (
                                    <motion.button
                                      key={stateOption}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.01 }}
                                      onClick={() => {
                                        setState(stateOption);
                                        setShowStateDropdown(false);
                                      }}
                                      className={`w-full px-4 py-3 text-left transition-all flex items-center justify-between group ${
                                        stateOption === state
                                          ? "bg-[#043570] text-white"
                                          : "text-[#043570] hover:bg-[#f3faff]"
                                      }`}
                                    >
                                      <span className="font-medium">{stateOption}</span>
                                      {stateOption === state && (
                                        <Check size={18} className="text-[#00c0ff]" />
                                      )}
                                    </motion.button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Insurance Carrier */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Insurance carrier
                        </label>
                        <div className="relative">
                          <button
                            onClick={() => setShowCarrierDropdown(!showCarrierDropdown)}
                            className="w-full px-4 py-3.5 bg-[#f3faff] border-2 border-[#00c0ff]/30 rounded-xl text-left flex items-center justify-between hover:border-[#00c0ff] transition-all group"
                          >
                            <span className="text-[#043570] font-medium">{carrier}</span>
                            <ChevronDown
                              size={18}
                              className={`text-[#00c0ff] transition-transform duration-300 ${
                                showCarrierDropdown ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {showCarrierDropdown && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 bg-white border-2 border-[#00c0ff]/30 rounded-xl shadow-xl overflow-hidden"
                              >
                                <div className="max-h-[400px] overflow-y-auto">
                                  {INSURANCE_CARRIERS.map((carrierOption, index) => (
                                    <motion.button
                                      key={carrierOption}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.03 }}
                                      onClick={() => handleCarrierSelect(carrierOption)}
                                      className={`w-full px-4 py-3.5 text-left transition-all flex items-center justify-between group ${
                                        carrierOption === carrier
                                          ? "bg-[#043570] text-white"
                                          : "text-[#043570] hover:bg-[#f3faff]"
                                      }`}
                                    >
                                      <span className="font-medium">{carrierOption}</span>
                                      {carrierOption === carrier && (
                                        <Check size={18} className="text-[#00c0ff]" />
                                      )}
                                    </motion.button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Member Details */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      {/* Carrier Display */}
                      <div>
                        <label className="block text-sm text-slate-600 mb-2">
                          Insurance carrier
                        </label>
                        <div className="relative">
                          <button
                            onClick={() => setShowCarrierDropdown(!showCarrierDropdown)}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-left flex items-center justify-between hover:border-slate-400 transition-colors"
                          >
                            <span className="text-slate-900">{carrier}</span>
                            <ChevronDown
                              size={18}
                              className={`text-slate-400 transition-transform ${
                                showCarrierDropdown ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {showCarrierDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10"
                            >
                              {INSURANCE_CARRIERS.map((carrierOption) => (
                                <button
                                  key={carrierOption}
                                  onClick={() => {
                                    setCarrier(carrierOption);
                                    setShowCarrierDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors text-slate-900"
                                >
                                  {carrierOption}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* First Name and Last Name */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-600 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-600 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm text-slate-600 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Member ID and Group ID */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-1.5 text-sm text-slate-600 mb-2">
                            Member ID
                            <div className="relative group">
                              <Info size={16} className="text-slate-400 cursor-help" />
                              <div className="absolute left-0 bottom-full mb-2 w-64 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-20">
                                Type the full 9-13 character Member ID that's on your insurance card. Don't forget to include all letters and numbers.
                                <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                              </div>
                            </div>
                          </label>
                          <input
                            type="text"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-600 mb-2">
                            Group ID (optional)
                          </label>
                          <input
                            type="text"
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Relationship */}
                      <div>
                        <label className="flex items-center gap-1.5 text-sm text-slate-600 mb-2">
                          Relationship to Insurance Holder
                          <div className="relative group">
                            <Info size={16} className="text-slate-400 cursor-help" />
                            <div className="absolute left-0 bottom-full mb-2 w-64 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-20">
                              What is your relationship to the primary person who owns the insurance policy? If you are the primary insurance holder, choose "Self."
                              <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                            </div>
                          </div>
                        </label>
                        <div className="relative">
                          <button
                            onClick={() => setShowRelationshipDropdown(!showRelationshipDropdown)}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-left flex items-center justify-between hover:border-slate-400 transition-colors"
                          >
                            <span className="text-slate-900">{relationship}</span>
                            <ChevronDown
                              size={18}
                              className={`text-slate-400 transition-transform ${
                                showRelationshipDropdown ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {showRelationshipDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10"
                            >
                              {RELATIONSHIPS.map((rel) => (
                                <button
                                  key={rel}
                                  onClick={() => {
                                    setRelationship(rel);
                                    setShowRelationshipDropdown(false);
                                  }}
                                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors text-slate-900"
                                >
                                  {rel}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Continue Button */}
                      <div className="pt-4">
                        <button
                          onClick={() => setStep(3)}
                          className="w-full py-3 px-4 bg-[#00c0ff] hover:bg-[#043570] text-white rounded-lg transition-colors font-medium"
                        >
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: File Upload */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Insurance Cards Header */}
                      <div>
                        <h4 className="text-base font-semibold text-slate-900 mb-2">
                          Insurance cards
                        </h4>
                        <p className="text-sm text-slate-600 mb-6">
                          Please upload front and back images of your insurance
                          cards. We use this to verify the insurance info you
                          provided above.
                        </p>
                      </div>

                      {/* Front of Card */}
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Front of card
                        </label>
                        <div
                          onClick={() => frontInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-300 rounded-lg px-6 py-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#00c0ff] hover:bg-[#f3faff] transition-colors"
                        >
                          {frontCardFile ? (
                            <div className="text-center">
                              <Upload size={32} className="text-green-600 mx-auto mb-2" />
                              <p className="text-sm text-slate-900 font-medium">
                                {frontCardFile.name}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                Click to change
                              </p>
                            </div>
                          ) : (
                            <>
                              <Upload size={32} className="text-slate-400 mb-3" />
                              <p className="text-sm text-slate-900 text-center">
                                Drag and drop a file or{" "}
                                <span className="text-[#00c0ff] font-medium">
                                  browse your device
                                </span>
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                (JPG, PNG, GIF, or PDF • 50 MB file size limit)
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          ref={frontInputRef}
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file, "front");
                          }}
                          className="hidden"
                        />
                      </div>

                      {/* Back of Card */}
                      <div>
                        <label className="block text-base font-semibold text-slate-900 mb-3">
                          Back of card
                        </label>
                        <div
                          onClick={() => backInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-300 rounded-lg px-6 py-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#00c0ff] hover:bg-[#f3faff] transition-colors"
                        >
                          {backCardFile ? (
                            <div className="text-center">
                              <Upload size={32} className="text-green-600 mx-auto mb-2" />
                              <p className="text-sm text-slate-900 font-medium">
                                {backCardFile.name}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                Click to change
                              </p>
                            </div>
                          ) : (
                            <>
                              <Upload size={32} className="text-slate-400 mb-3" />
                              <p className="text-sm text-slate-900 text-center">
                                Drag and drop a file or{" "}
                                <span className="text-[#00c0ff] font-medium">
                                  browse your device
                                </span>
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                (JPG, PNG, GIF, or PDF • 50 MB file size limit)
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          ref={backInputRef}
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file, "back");
                          }}
                          className="hidden"
                        />
                      </div>

                      {/* Save Button */}
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          onClick={() => setShowNotFoundModal(true)}
                          className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors font-medium"
                        >
                          Not found
                        </button>
                        <button
                          onClick={handleSaveChanges}
                          className="px-6 py-2.5 bg-[#00c0ff] hover:bg-[#043570] text-white rounded-lg transition-colors font-medium"
                        >
                          Save changes
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Insurance Not Found Modal */}
      <InsuranceNotFoundModal
        isOpen={showNotFoundModal}
        onClose={() => setShowNotFoundModal(false)}
        onEditInfo={() => {
          setShowNotFoundModal(false);
          setStep(2);
        }}
        insuranceData={{
          carrier,
          name: "Shweta Jain",
          dateOfBirth: "June 5th, 1987",
          location: "Wyoming",
          memberId: memberId || "234234",
        }}
      />
    </>
  );
}
