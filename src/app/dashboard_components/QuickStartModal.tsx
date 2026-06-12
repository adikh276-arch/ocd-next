import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Mic, CheckCircle2, Circle } from "lucide-react";
import { FaChair } from "react-icons/fa";
import { GiRolledCloth } from "react-icons/gi";

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  planColor: string;
}

export function QuickStartModal({ isOpen, onClose, planTitle, planColor }: QuickStartModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);
  const [hasMatChecked, setHasMatChecked] = useState(false);
  const [hasChairChecked, setHasChairChecked] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [micError, setMicError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const positionChecks = [
    { id: 1, label: "Full body visible", checked: true },
    { id: 2, label: "Good lighting", checked: false },
    { id: 3, label: "Clear background", checked: true },
    { id: 4, label: "Face visible", checked: true },
  ];

  useEffect(() => {
    // Cleanup stream when modal closes
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleCameraToggle = async () => {
    if (!cameraPermission) {
      try {
        setCameraError("");
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user" } 
        });
        setStream(mediaStream);
        setCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err: any) {
        console.log("Camera not available:", err);
        // Set permission to true anyway to allow proceeding
        setCameraPermission(true);
        if (err.name === "NotFoundError") {
          setCameraError("No camera found (you can still proceed)");
        } else if (err.name === "NotAllowedError") {
          setCameraError("Camera access denied (you can still proceed)");
        } else {
          setCameraError("Unable to access camera (you can still proceed)");
        }
      }
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      setCameraPermission(false);
      setCameraError("");
    }
  };

  const handleMicToggle = async () => {
    if (!micPermission) {
      try {
        setMicError("");
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission(true);
        // Stop the audio stream immediately as we only need permission
        audioStream.getTracks().forEach(track => track.stop());
      } catch (err: any) {
        console.log("Microphone not available:", err);
        // Set permission to true anyway to allow proceeding
        setMicPermission(true);
        if (err.name === "NotFoundError") {
          setMicError("No microphone found (optional - you can still proceed)");
        } else if (err.name === "NotAllowedError") {
          setMicError("Microphone access denied (optional - you can still proceed)");
        } else {
          setMicError("Microphone not available (optional - you can still proceed)");
        }
      }
    } else {
      setMicPermission(false);
      setMicError("");
    }
  };

  const handleProceed = () => {
    setStep(2);
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setStep(1);
    setCameraPermission(false);
    setMicPermission(false);
    setHasMatChecked(false);
    setHasChairChecked(false);
    setCameraError("");
    setMicError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
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
          className="relative w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>

          {step === 1 ? (
            // Step 1: Prepare for Your Session
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#0f172b] mb-1">
                Prepare for Your Session
              </h2>
              <p className="text-sm text-[#64748B] mb-6">
                Please allow the necessary permissions and prepare your equipment to get started.
              </p>

              {/* Permissions Section */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
                <h3 className="text-sm font-semibold text-[#0f172b] mb-4">Permissions</h3>

                {/* Camera Permission */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Camera size={16} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0f172b]">Camera Permission Required</p>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        We need access to your camera to provide real-time motion tracking and feedback.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <span className="text-xs text-[#64748B]">Allow Camera Access</span>
                    <button
                      onClick={handleCameraToggle}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        cameraPermission ? "bg-[#00c0ff]" : "bg-gray-300"
                      }`}
                    >
                      <motion.div
                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                        animate={{ x: cameraPermission ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  {cameraError && <p className="text-xs text-red-500 mt-1">{cameraError}</p>}
                </div>

                {/* Microphone Permission */}
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mic size={16} className="text-teal-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0f172b]">Microphone Permission Required</p>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        We need access to your microphone so you can hear our instructions clearly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <span className="text-xs text-[#64748B]">Allow Microphone Access</span>
                    <button
                      onClick={handleMicToggle}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        micPermission ? "bg-[#00c0ff]" : "bg-gray-300"
                      }`}
                    >
                      <motion.div
                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                        animate={{ x: micPermission ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  {micError && <p className="text-xs text-red-500 mt-1">{micError}</p>}
                </div>
              </div>

              {/* Equipment Section */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
                <h3 className="text-sm font-semibold text-[#0f172b] mb-3">Prepare your equipment</h3>
                <p className="text-xs text-[#64748B] mb-4">
                  We recommend having the equipment before we begin
                </p>

                {/* Mat Checkbox */}
                <div
                  onClick={() => setHasMatChecked(!hasMatChecked)}
                  className="flex items-center gap-3 mb-3 cursor-pointer group"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    hasMatChecked ? "bg-[#00c0ff] border-[#00c0ff]" : "border-gray-300"
                  }`}>
                    {hasMatChecked && <CheckCircle2 size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <GiRolledCloth size={14} className="text-gray-600" />
                  </div>
                  <span className="text-sm text-[#0f172b]">Mat</span>
                </div>

                {/* Chair Checkbox */}
                <div
                  onClick={() => setHasChairChecked(!hasChairChecked)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    hasChairChecked ? "bg-[#00c0ff] border-[#00c0ff]" : "border-gray-300"
                  }`}>
                    {hasChairChecked && <CheckCircle2 size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <FaChair size={14} className="text-gray-600" />
                  </div>
                  <span className="text-sm text-[#0f172b]">Chair</span>
                </div>
              </div>

              {/* Proceed Button */}
              <motion.button
                onClick={handleProceed}
                disabled={!cameraPermission || !micPermission}
                whileHover={{ scale: !cameraPermission || !micPermission ? 1 : 1.02 }}
                whileTap={{ scale: !cameraPermission || !micPermission ? 1 : 0.98 }}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  cameraPermission && micPermission
                    ? "bg-[#00c0ff] text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Proceed
              </motion.button>
            </div>
          ) : (
            // Step 2: Simulation
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#0f172b] mb-6">
                Simulation
              </h2>

              {/* Camera View */}
              <div className="bg-black rounded-2xl overflow-hidden mb-6 aspect-video flex items-center justify-center relative">
                {stream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera size={48} className="text-gray-600" />
                )}
              </div>

              {/* Position Checklist */}
              <div>
                <p className="text-sm font-semibold text-[#0f172b] mb-3">
                  Position yourself correctly:
                </p>

                <div className="space-y-2 mb-6">
                  {positionChecks.map((check) => (
                    <div
                      key={check.id}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg ${
                        check.checked ? "bg-green-50" : "bg-blue-50"
                      }`}
                    >
                      {check.checked ? (
                        <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" strokeWidth={2.5} />
                      ) : (
                        <Circle size={18} className="text-blue-400 flex-shrink-0" strokeWidth={2} />
                      )}
                      <span className={`text-sm font-medium ${
                        check.checked ? "text-green-700" : "text-blue-600"
                      }`}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Adjust Position Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm bg-[#00c0ff] text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Adjust your position
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
