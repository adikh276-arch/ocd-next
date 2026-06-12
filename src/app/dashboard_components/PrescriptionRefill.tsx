import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Pill, Upload, Plus, X, FileText, Clock, Shield, CheckCircle2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

interface Medication {
  id: string;
  name: string;
  dosage: string;
}

export function PrescriptionRefill() {
  const router = useRouter();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const addMedication = () => {
    if (medicationName.trim() && dosage.trim()) {
      const newMed: Medication = {
        id: Date.now().toString(),
        name: medicationName,
        dosage: dosage,
      };
      setMedications([...medications, newMed]);
      setMedicationName("");
      setDosage("");
    }
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (medications.length > 0) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setMedications([]);
        setAdditionalNotes("");
        setUploadedFile(null);
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar - desktop only */}
      <Sidebar />

      {/* Mobile Nav - mobile only */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB]">
        <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-20 md:pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => router.push(-1)}
                className="flex items-center justify-center text-[#64748B] hover:text-[#043570] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="w-10 h-10 bg-[#FEF3C7] rounded-md flex items-center justify-center flex-shrink-0">
                <Pill size={20} className="text-[#F59E0B]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">
                  Prescription Refill
                </h1>
                <p className="text-sm text-[#62748e] font-normal">
                  Request refills for your existing prescriptions
                </p>
              </div>
            </div>
          </motion.div>

          {/* Success Modal */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
                >
                  <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-[#10B981]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#043570] mb-2">
                    Request Submitted!
                  </h3>
                  <p className="text-[#64748B]">
                    Your prescription refill request has been received. Our pharmacy team will process it within 24 hours.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6"
          >
            {/* Upload Previous Prescription */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#043570] mb-4">
                Upload Previous Prescription (Optional)
              </h3>
              <div className="relative">
                <input
                  type="file"
                  id="prescription-upload"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="prescription-upload"
                  className="flex items-center justify-center gap-3 px-6 py-8 bg-[#f3faff] border-2 border-dashed border-[#BFDBFE] rounded-xl cursor-pointer hover:bg-[#EFF6FF] transition-colors"
                >
                  <Upload size={24} className="text-[#2563EB]" />
                  <span className="text-[#043570] font-medium">
                    {uploadedFile ? uploadedFile.name : "Click to upload prescription image or PDF"}
                  </span>
                </label>
                {uploadedFile && (
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <X size={16} className="text-[#EF4444]" />
                  </button>
                )}
              </div>
            </div>

            {/* Add Medications */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#043570] mb-4">
                Add Medications
              </h3>
              
              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#043570] mb-2">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    placeholder="e.g., Lisinopril"
                    className="w-full px-4 py-3 bg-[#f3faff] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#043570]"
                    onKeyPress={(e) => e.key === 'Enter' && addMedication()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#043570] mb-2">
                    Dosage & Frequency
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g., 10mg once daily"
                    className="w-full px-4 py-3 bg-[#f3faff] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#043570]"
                    onKeyPress={(e) => e.key === 'Enter' && addMedication()}
                  />
                </div>
              </div>

              <button
                onClick={addMedication}
                disabled={!medicationName.trim() || !dosage.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Plus size={18} />
                <span className="text-sm font-medium">Add Medication</span>
              </button>

              {/* Medications List */}
              {medications.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-semibold text-[#043570]">
                    Medications to Refill ({medications.length})
                  </h4>
                  <AnimatePresence>
                    {medications.map((med) => (
                      <motion.div
                        key={med.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center justify-between p-4 bg-[#f3faff] border border-slate-200 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
                            <Pill size={16} className="text-[#F59E0B]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#043570]">{med.name}</p>
                            <p className="text-sm text-[#64748B]">{med.dosage}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMedication(med.id)}
                          className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-red-50 transition-colors"
                        >
                          <X size={16} className="text-[#EF4444]" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#043570] mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any special instructions or information for the pharmacist..."
                rows={4}
                className="w-full px-4 py-3 bg-[#f3faff] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#043570] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={medications.length === 0}
              className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-semibold hover:bg-[#1d4ed8] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 group disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="text-lg">Submit Refill Request</span>
            </button>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
            >
              <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center mb-3">
                <Clock size={24} className="text-[#2563EB]" />
              </div>
              <h3 className="font-semibold text-[#043570] mb-1">Quick Processing</h3>
              <p className="text-sm text-[#64748B]">
                Most refill requests processed within 24 hours
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
            >
              <div className="w-12 h-12 bg-[#D1FAE5] rounded-xl flex items-center justify-center mb-3">
                <Shield size={24} className="text-[#10B981]" />
              </div>
              <h3 className="font-semibold text-[#043570] mb-1">Secure & Safe</h3>
              <p className="text-sm text-[#64748B]">
                All prescriptions verified by licensed pharmacists
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
            >
              <div className="w-12 h-12 bg-[#FEE2E2] rounded-xl flex items-center justify-center mb-3">
                <FileText size={24} className="text-[#EF4444]" />
              </div>
              <h3 className="font-semibold text-[#043570] mb-1">Easy Tracking</h3>
              <p className="text-sm text-[#64748B]">
                Get notified when your prescription is ready
              </p>
            </motion.div>
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h3 className="font-semibold text-[#043570] mb-6">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#f3faff] text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  1
                </div>
                <h4 className="font-medium text-[#043570] mb-2">Add Medications</h4>
                <p className="text-sm text-[#64748B]">
                  List all medications you need refilled
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#f3faff] text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  2
                </div>
                <h4 className="font-medium text-[#043570] mb-2">Submit Request</h4>
                <p className="text-sm text-[#64748B]">
                  Send your refill request to our pharmacy
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#f3faff] text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  3
                </div>
                <h4 className="font-medium text-[#043570] mb-2">Verification</h4>
                <p className="text-sm text-[#64748B]">
                  Pharmacist reviews and approves your request
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#f3faff] text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  4
                </div>
                <h4 className="font-medium text-[#043570] mb-2">Pick Up</h4>
                <p className="text-sm text-[#64748B]">
                  Get notified when ready for pickup or delivery
                </p>
              </div>
            </div>
          </motion.div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-4 mt-6"
          >
            <div className="flex items-start gap-3">
              <FileText size={20} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#043570] mb-1">
                  Important Note
                </p>
                <p className="text-sm text-[#64748B]">
                  Some medications may require a new prescription from your doctor. Our pharmacy team will contact you if additional authorization is needed. Controlled substances may have special requirements.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
