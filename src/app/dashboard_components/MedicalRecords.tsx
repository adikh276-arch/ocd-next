import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, FileText, Download, Eye, Calendar, User, Weight, Activity, Stethoscope, AlertCircle, Search, Filter, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MedicalRecord {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  complaint: string;
  gender: string;
  age: number;
  weight: string;
  date: string;
  recordType: "consultation" | "lab" | "prescription" | "imaging";
  avatar?: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: "Abcdef123",
    patientName: "Jay Abc",
    doctorName: "Dr. Rakesh Jain",
    specialty: "Dentist",
    complaint: "Tooth Pain, Gum swelling, Dental cavity",
    gender: "Male",
    age: 25,
    weight: "60kg",
    date: "2024-03-15",
    recordType: "consultation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    id: "Xyz789456",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Emily Chen",
    specialty: "Cardiologist",
    complaint: "Chest pain, Shortness of breath, Irregular heartbeat",
    gender: "Female",
    age: 42,
    weight: "68kg",
    date: "2024-03-12",
    recordType: "consultation",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: "Lab456789",
    patientName: "Michael Smith",
    doctorName: "Dr. Robert Williams",
    specialty: "General Physician",
    complaint: "Annual health checkup, Blood test, Complete metabolic panel",
    gender: "Male",
    age: 35,
    weight: "75kg",
    date: "2024-03-10",
    recordType: "lab",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  },
  {
    id: "Prx147258",
    patientName: "Lisa Anderson",
    doctorName: "Dr. James Taylor",
    specialty: "Dermatologist",
    complaint: "Skin rash, Allergic reaction, Eczema treatment",
    gender: "Female",
    age: 28,
    weight: "62kg",
    date: "2024-03-08",
    recordType: "prescription",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  },
  {
    id: "Img369258",
    patientName: "David Brown",
    doctorName: "Dr. Maria Garcia",
    specialty: "Orthopedic",
    complaint: "Back pain, Spinal alignment, MRI scan for lower back",
    gender: "Male",
    age: 48,
    weight: "82kg",
    date: "2024-03-05",
    recordType: "imaging",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop"
  }
];

const recordTypeConfig = {
  consultation: { color: "#2563EB", label: "Consultation", icon: Stethoscope },
  lab: { color: "#10B981", label: "Lab Report", icon: Activity },
  prescription: { color: "#F59E0B", label: "Prescription", icon: FileText },
  imaging: { color: "#8B5CF6", label: "Imaging", icon: Eye }
};

export function MedicalRecords() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = 
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.complaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || record.recordType === selectedType;
    
    return matchesSearch && matchesType;
  });

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
              <div className="w-10 h-10 bg-[#DBEAFE] rounded-md flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-[#2563EB]" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl text-[#0f172b] font-medium">
                  Medical Records
                </h1>
                <p className="text-sm text-[#62748e] font-normal">
                  View and manage your medical history
                </p>
              </div>
            </div>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by patient, doctor, or condition..."
                  className="w-full pl-12 pr-4 py-3 bg-[#f3faff] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#043570]"
                />
              </div>

              {/* Filter by Type */}
              <div className="relative">
                <Filter size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full md:w-56 pl-12 pr-4 py-3 bg-[#f3faff] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#043570] appearance-none cursor-pointer"
                >
                  <option value="all">All Records</option>
                  <option value="consultation">Consultations</option>
                  <option value="lab">Lab Reports</option>
                  <option value="prescription">Prescriptions</option>
                  <option value="imaging">Imaging</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Records List */}
          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center"
              >
                <AlertCircle size={48} className="text-[#64748B] mx-auto mb-4" />
                <p className="text-[#64748B] text-lg">No records found</p>
                <p className="text-[#64748B] text-sm mt-2">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              filteredRecords.map((record, index) => {
                const config = recordTypeConfig[record.recordType];
                const RecordIcon = config.icon;
                
                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <img
                              src={record.avatar}
                              alt={record.patientName}
                              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-[#f3faff]"
                            />
                            <div 
                              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                              style={{ backgroundColor: config.color }}
                            >
                              <RecordIcon size={16} className="text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-[#043570] mb-1">
                                {record.patientName}
                              </h3>
                              <p className="text-sm text-[#64748B] mb-2">
                                {record.doctorName} - <span className="font-medium">{record.specialty}</span>
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-xs text-[#64748B] mb-1">ID: {record.id}</p>
                              <span 
                                className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: config.color }}
                              >
                                {config.label}
                              </span>
                            </div>
                          </div>

                          {/* Complaint */}
                          <div className="bg-[#f3faff] rounded-xl p-3 mb-4">
                            <p className="text-sm font-medium text-[#043570] mb-1">Complaint:</p>
                            <p className="text-sm text-[#64748B] line-clamp-2">{record.complaint}</p>
                          </div>

                          {/* Patient Details */}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-[#64748B]" />
                              <span className="text-[#043570] font-medium">{record.gender}, {record.age} yrs</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Weight size={16} className="text-[#64748B]" />
                              <span className="text-[#043570] font-medium">{record.weight}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-[#64748B]" />
                              <span className="text-[#043570] font-medium">
                                {new Date(record.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-5 pt-5 border-t border-slate-200">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] transition-colors font-medium">
                          <Eye size={18} />
                          <span>View Details</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f3faff] text-[#2563EB] border border-[#2563EB] rounded-xl hover:bg-[#EFF6FF] transition-colors font-medium">
                          <Download size={18} />
                          <span className="hidden md:inline">Download</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Add New Record Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#2563EB] text-white rounded-full shadow-lg hover:bg-[#1d4ed8] transition-all hover:shadow-xl flex items-center justify-center group"
            onClick={() => alert('Add new record functionality coming soon!')}
          >
            <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          </motion.button>
        </main>
      </div>
    </div>
  );
}
