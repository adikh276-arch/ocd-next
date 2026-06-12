import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MapPin, Star, Calendar, User, Clock, Globe, Shield, Heart, ChevronLeft, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useState } from "react";
import { SwitchExpertModal } from "./SwitchExpertModal";
import { RateProviderModal } from "./RateProviderModal";
import { ReportProviderModal } from "./ReportProviderModal";

export function ProviderProfile() {
  const router = useRouter();
  const { providerId } = useParams();

  // Modal states
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Mock provider data - in real app this would be fetched based on providerId
  const provider = {
    id: providerId || "1",
    name: "Dr. Sarah Chen",
    title: "Licensed Psychologist, LCSW",
    image: "https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMHRoZXJhcGlzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI5NTYyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 1703,
    location: "Provider's Park, New Delhi, India",
    specializations: ["Abuse", "Addiction", "Anger", "Anxiety", "Bipolar", "OCD", "Expressive", "PTSD"],
    about: "I am a certified psychologist and a JD in Coach. I welcome you to path of healing. I am trained in treating various conditions like depression, anxiety, anger management, relationship, self esteem, trauma, Queer, lack of confidence. I believe that you are in support to fight with your uncontrollable life and help know circumstances of yours and move right guidance to fight with their circumstances...",
    education: "Master's",
    sessionTypes: ["Individual", "Couple", "Webinars", "Teen"],
    practicingSince: "June, 2020",
    languages: ["English", "Hindi", "Arabic"],
    ethnicity: "Hindu",
    insurance: ["Aetna", "Blue Cross", "Medicare", "UHC", "Anthem", "Cigna", "Humana", "Kaiser", "Oxford", "Cigna", "OCS", "Aetna", "Expresscure", "PTSD"],
    timings: [
      { day: "Mon", slots: [{ time: "07:30 - 11:30", color: "#10B981" }] },
      { day: "Tue", slots: [{ time: "07:30 - 11:30", color: "#10B981" }, { time: "12:30 - 17:00", color: "#3B82F6" }] },
      { day: "Wed", slots: [{ time: "07:30", color: "#10B981" }] },
      { day: "Thu", slots: [{ time: "12:30 - 17:00", color: "#3B82F6" }] },
      { day: "Fri", slots: [{ time: "12:30 - 17:00", color: "#3B82F6" }, { time: "17:30 - 19:30", color: "#F59E0B" }, { time: "19:45 - 21:30", color: "#EF4444" }] },
      { day: "Sat", slots: [] },
      { day: "Sun", slots: [] },
    ],
    availableSlots: ["09:30", "10:30", "11:00", "11:30", "12:30", "12:30", "13:00", "14:00"],
    videoThumbnails: 4,
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileNav />
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-6">
            {/* Header - Outside white box */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => router.push(-1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-[#64748B] hover:text-[#020817] hover:bg-white"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-[#043570]">Provider Profile</h1>
            </div>

            {/* Provider Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 mb-4 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <ImageWithFallback
                  src={provider.image}
                  alt={provider.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-1">
                    <h1 className="text-xl font-bold text-[#043570]">{provider.name}</h1>
                    
                    {/* Minimized Action Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setShowSwitchModal(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3faff] hover:bg-[#E2ECF5] border border-[#E2ECF5] rounded-lg transition-colors"
                        title="Switch"
                      >
                        <RefreshCw size={14} className="text-[#043570]" />
                        <span className="text-xs font-medium text-[#043570]">Switch</span>
                      </button>
                      
                      <button
                        onClick={() => setShowRatingModal(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3faff] hover:bg-[#E2ECF5] border border-[#E2ECF5] rounded-lg transition-colors"
                        title="Rate"
                      >
                        <Star size={14} className="text-[#043570]" />
                        <span className="text-xs font-medium text-[#043570]">Rate</span>
                      </button>
                      
                      <button
                        onClick={() => setShowReportModal(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3faff] hover:bg-[#E2ECF5] border border-[#E2ECF5] rounded-lg transition-colors"
                        title="Report"
                      >
                        <AlertCircle size={14} className="text-[#043570]" />
                        <span className="text-xs font-medium text-[#043570]">Report</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#64748B] mb-2">{provider.title}</p>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                      ))}
                      <span className="text-xs text-[#64748B] ml-1">({provider.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <MapPin size={14} className="text-[#00c0ff]" />
                    <span>{provider.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Specializations */}
            <Section title="Specializations" icon="🎯">
              <div className="flex flex-wrap gap-2">
                {provider.specializations.map((spec, i) => (
                  <motion.span
                    key={spec}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="px-3 py-1.5 bg-[#f3faff] text-[#043570] rounded-lg text-xs font-medium border border-[#E2ECF5]"
                  >
                    {spec}
                  </motion.span>
                ))}
              </div>
            </Section>

            {/* About */}
            <Section title={`About ${provider.name.split(" ")[1]}`} icon="👤">
              <p className="text-sm text-[#64748B] leading-relaxed">{provider.about}</p>
            </Section>

            {/* Videos */}
            <Section title="Video" icon="🎥">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[...Array(provider.videoThumbnails)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="aspect-video bg-gradient-to-br from-[#f3faff] to-[#E2ECF5] rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#043570] border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Education */}
            <InfoRow icon="🎓" label="Education" value={provider.education} />

            {/* Session Type */}
            <InfoRow icon="💬" label="Session Type" value={provider.sessionTypes.join(", ")} />

            {/* Practicing Since */}
            <InfoRow icon="📅" label="Practicing Since" value={provider.practicingSince} />

            {/* Languages */}
            <InfoRow icon="🌍" label="Languages" value={provider.languages.join(", ")} />

            {/* Ethnicity */}
            <InfoRow icon="🙏" label="Ethnicity" value={provider.ethnicity} />

            {/* Insurance Accepted */}
            <Section title="Insurance Accepted" icon="🛡️">
              <div className="flex flex-wrap gap-2">
                {provider.insurance.map((ins, i) => (
                  <motion.span
                    key={`${ins}-${i}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.02 }}
                    className="px-3 py-1.5 bg-[#f3faff] text-[#043570] rounded-lg text-xs font-medium border border-[#E2ECF5]"
                  >
                    {ins}
                  </motion.span>
                ))}
              </div>
            </Section>

            {/* Timings */}
            <Section title="Timings" icon="⏰">
              <div className="space-y-2">
                {provider.timings.map((timing) => (
                  <div key={timing.day} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#043570] w-10">{timing.day}:</span>
                    <div className="flex flex-wrap gap-2">
                      {timing.slots.length > 0 ? (
                        timing.slots.map((slot, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: slot.color }}
                          >
                            {slot.time}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[#64748B]">Closed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Availability */}
            <Section title="Availability" icon="📅">
              <div className="mb-4">
                <button className="text-sm text-[#00c0ff] hover:text-[#043570] font-medium">
                  Choose the date
                </button>
              </div>
              
              {/* Calendar Week View */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
                  const dates = [12, 13, 14, 15, 16, 17, 18];
                  const isSelected = i === 2; // Wednesday selected
                  return (
                    <div key={i} className="text-center">
                      <div className="text-xs text-[#64748B] mb-1">{day}</div>
                      <button
                        className={`w-full aspect-square rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-[#00c0ff] text-white"
                            : "bg-[#f3faff] text-[#043570] hover:bg-[#E2ECF5]"
                        }`}
                      >
                        {dates[i]}
                        <br />
                        <span className="text-[10px]">Aug</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Available Times */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#043570] mb-2">Available time slots:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {provider.availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      className="px-3 py-2 bg-[#f3faff] hover:bg-[#00c0ff] hover:text-white text-[#043570] rounded-lg text-xs font-medium border border-[#E2ECF5] transition-colors"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </Section>

            {/* Location */}
            <Section title="Location" icon="📍">
              <div className="bg-[#E2ECF5] rounded-xl overflow-hidden h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-[#00c0ff] mx-auto mb-2" />
                  <p className="text-sm text-[#64748B]">{provider.location}</p>
                </div>
              </div>
            </Section>

            {/* Reviews */}
            <Section title="Reviews" icon="⭐">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#043570]">{provider.rating}</span>
                <span className="text-xs text-[#64748B]">({provider.reviews} reviews)</span>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                {[
                  {
                    name: "Client Name",
                    date: "2 days ago",
                    text: "I am a certified psychologist and a JD in Coach. I welcome you to path of healing. I am trained in treating various conditions like depression, anxiety, anger management, relationship, self esteem, trauma, Queer, lack of confidence.",
                  },
                  {
                    name: "Client Name",
                    date: "5 days ago",
                    text: "I am a certified psychologist and a JD in Coach. I welcome you to path of healing. I am trained in treating various conditions like depression, anxiety, anger management, relationship, self esteem, trauma, Queer, lack of confidence.",
                  },
                ].map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="pb-4 border-b border-[#E2ECF5] last:border-b-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-[#043570]">{review.name}</span>
                      <span className="text-xs text-[#64748B]">{review.date}</span>
                    </div>
                    <p className="text-sm text-[#64748B] leading-relaxed">{review.text}</p>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SwitchExpertModal
        isOpen={showSwitchModal}
        onClose={() => setShowSwitchModal(false)}
        currentExpertRole="Psychologist"
        onPreferencesClick={() => {}}
      />

      <RateProviderModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        provider={{
          id: provider.id,
          name: provider.name,
          title: provider.title,
        }}
        onSubmit={(rating, feedback) => {
          console.log("Rating submitted:", { rating, feedback });
        }}
      />

      <ReportProviderModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        providerName={provider.name}
        onSubmit={(reasons, otherReason) => {
          console.log("Report submitted:", { reasons, otherReason });
          setShowReportModal(false);
        }}
      />
    </div>
  );
}

// Section Component
function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 mb-4 shadow-sm"
    >
      <h2 className="text-sm font-semibold text-[#043570] mb-4 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

// Info Row Component
function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 mb-4 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-sm font-semibold text-[#043570]">{label}:</span>
        <span className="text-sm text-[#64748B]">{value}</span>
      </div>
    </motion.div>
  );
}
