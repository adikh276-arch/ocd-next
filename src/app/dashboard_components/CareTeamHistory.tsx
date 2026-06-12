import { MessageCircle, Search, Send, Paperclip, MoreVertical, Phone, Video, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Expert {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  image: string;
  status: "online" | "offline";
  lastSeen?: string;
}

interface Message {
  id: string;
  expertId: string;
  expertName: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  date: string;
}

const experts: Expert[] = [
  {
    id: "1",
    name: "Mantra AI",
    role: "Care Assistant",
    specialty: "Mental Health",
    avatar: "MA",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=400&fit=crop&crop=faces",
    status: "online"
  },
  {
    id: "2",
    name: "Dr. Michael Brown",
    role: "Therapist",
    specialty: "Therapy",
    avatar: "MB",
    status: "online"
  },
  {
    id: "3",
    name: "Dr. Emily White",
    role: "Medical Doctor",
    specialty: "General Medicine",
    avatar: "EW",
    status: "offline",
    lastSeen: "2 hours ago"
  },
  {
    id: "4",
    name: "Coach Alex Turner",
    role: "Wellness Coach",
    specialty: "Lifestyle & Nutrition",
    avatar: "AT",
    status: "online"
  },
  {
    id: "5",
    name: "Dr. Rachel Green",
    role: "Sexologist",
    specialty: "Sexual Health",
    avatar: "RG",
    status: "offline",
    lastSeen: "Yesterday"
  },
  {
    id: "6",
    name: "Lisa Anderson",
    role: "Nutritionist",
    specialty: "Diet & Wellness",
    avatar: "LA",
    status: "online"
  }
];

const messages: Message[] = [
  {
    id: "1",
    expertId: "2",
    expertName: "Dr. Michael Brown",
    preview: "That's great progress! Keep up with the breathing exercises.",
    timestamp: "10:45 AM",
    unread: false,
    date: "Today"
  },
  {
    id: "2",
    expertId: "4",
    expertName: "Coach Alex Turner",
    preview: "I've created a customized meal plan for you. Check it out!",
    timestamp: "Yesterday",
    unread: false,
    date: "Yesterday"
  },
  {
    id: "3",
    expertId: "1",
    expertName: "Mantra AI",
    preview: "Your personal wellbeing companion",
    timestamp: "2 days ago",
    unread: false,
    date: "2 days ago"
  },
  {
    id: "4",
    expertId: "6",
    expertName: "Lisa Anderson",
    preview: "Remember to track your meals this week.",
    timestamp: "3 days ago",
    unread: false,
    date: "3 days ago"
  },
  {
    id: "5",
    expertId: "3",
    expertName: "Dr. Emily White",
    preview: "Your lab results look good. Let's discuss them.",
    timestamp: "4 days ago",
    unread: false,
    date: "4 days ago"
  }
];

export function CareTeamHistory() {
  const router = useRouter();
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showExpertsList, setShowExpertsList] = useState(true);

  const handleExpertClick = (expert: Expert) => {
    setSelectedExpert(expert);
    setSelectedMessage(null);
    setShowExpertsList(false);
  };

  const handleMessageClick = (message: Message) => {
    const expert = experts.find(e => e.id === message.expertId);
    if (expert) {
      setSelectedExpert(expert);
      setSelectedMessage(message);
      setShowExpertsList(false);
    }
  };

  const handleBack = () => {
    setSelectedExpert(null);
    setSelectedMessage(null);
    setShowExpertsList(true);
  };

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(message =>
    message.expertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 flex">
          {/* Left Panel - Experts & Messages */}
          <div className={`${showExpertsList ? 'flex' : 'hidden md:flex'} w-full md:w-80 lg:w-96 xl:w-[420px] 2xl:w-[480px] bg-white border-r border-[#E2ECF5] flex-col pt-[60px] md:pt-0`}>
            {/* Header */}
            <div className="p-4 border-b border-[#E2ECF5]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(-1)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-[#64748B] hover:text-[#020817] hover:bg-[#f3faff]"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <h2 className="text-lg font-semibold text-[#020817]">History</h2>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#f3faff] border border-[#E2ECF5] rounded-lg text-sm text-[#020817] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent"
                />
              </div>
            </div>

            {/* Experts List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3">
                <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2 px-2">
                  Past Conversations
                </h3>
                <div className="space-y-1">
                  {filteredExperts.map((expert) => {
                    // Find if there's a message for this expert
                    const expertMessage = messages.find(msg => msg.expertId === expert.id);
                    const hasMessage = !!expertMessage;
                    
                    // Compute classNames outside JSX to avoid template literal issues
                    const nameClassName = 'text-sm truncate font-medium text-[#020817]';
                    const roleClassName = 'text-xs text-[#64748B]';
                    const messageClassName = 'text-xs truncate text-[#64748B]';
                    
                    return (
                      <motion.button
                        key={expert.id}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleExpertClick(expert)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all ${
                          selectedExpert?.id === expert.id
                            ? "bg-[#f3faff] border-2 border-[#00c0ff]"
                            : "hover:bg-[#f3faff] border-2 border-transparent"
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          {expert.image ? (
                            <ImageWithFallback 
                              src={expert.image} 
                              alt={expert.name}
                              className="w-11 h-11 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-11 h-11 bg-gradient-to-br from-[#00c0ff] to-[#043570] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {expert.avatar}
                            </div>
                          )}
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            expert.status === "online" ? "bg-[#10B981]" : "bg-[#64748B]"
                          }`}></div>
                        </div>
                        <div className="flex-1 text-left overflow-hidden min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <h4 className={nameClassName}>
                              {expert.name} <span className={roleClassName}>({expert.role})</span>
                            </h4>
                            {hasMessage && expertMessage && (
                              <span className="text-[10px] text-[#64748B] font-normal flex-shrink-0">{expertMessage.timestamp}</span>
                            )}
                          </div>
                          {hasMessage && expertMessage ? (
                            <p className={messageClassName}>
                              {expertMessage.preview}
                            </p>
                          ) : (
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-[#64748B]">Get started</p>
                              <ChevronRight size={14} className="text-[#64748B] flex-shrink-0" />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Area */}
          <div className={`${!showExpertsList ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#FAFBFC] pt-[60px] md:pt-0`}>
            {selectedExpert ? (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b border-[#E2ECF5] px-4 md:px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleBack}
                        className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 text-[#64748B] hover:text-[#020817] hover:bg-[#f3faff]"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <div className="relative">
                        {selectedExpert.image ? (
                          <ImageWithFallback 
                            src={selectedExpert.image} 
                            alt={selectedExpert.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-[#00c0ff] to-[#043570] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {selectedExpert.avatar}
                          </div>
                        )}
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          selectedExpert.status === "online" ? "bg-[#10B981]" : "bg-[#64748B]"
                        }`}></div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#020817]">{selectedExpert.name}</h3>
                        <p className="text-xs text-[#64748B]">
                          {selectedExpert.status === "online" ? "Online" : `Last seen ${selectedExpert.lastSeen}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors"
                      >
                        <Phone size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors"
                      >
                        <Video size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors"
                      >
                        <MoreVertical size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  <div className="max-w-4xl mx-auto">
                    {/* Date Divider */}
                    <div className="flex items-center justify-center mb-6">
                      <span className="text-xs text-[#64748B] bg-white px-3 py-1 rounded-full border border-[#E2ECF5]">
                        {selectedMessage?.date || "Past Conversation"}
                      </span>
                    </div>

                    {/* Sample Messages */}
                    <div className="space-y-4">
                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        {selectedExpert.image ? (
                          <ImageWithFallback 
                            src={selectedExpert.image} 
                            alt={selectedExpert.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-[#00c0ff] to-[#043570] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                            {selectedExpert.avatar}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817]">
                              Hello! How can I help you today? Feel free to share any concerns or questions you have.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">10:30 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start gap-3 flex-row-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                          U
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-[#043570] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                            <p className="text-sm text-white">
                              Hi! I've been following the program for a week now and I'm feeling great. Thanks for all your support!
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 mr-1 block">10:32 AM</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start gap-3">
                        {selectedExpert.image ? (
                          <ImageWithFallback 
                            src={selectedExpert.image} 
                            alt={selectedExpert.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-[#00c0ff] to-[#043570] rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                            {selectedExpert.avatar}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#E2ECF5] max-w-md">
                            <p className="text-sm text-[#020817]">
                              That's wonderful to hear! Keep up the great work. Remember to stay consistent with your daily activities.
                            </p>
                          </div>
                          <span className="text-xs text-[#64748B] mt-1 ml-1 block">10:35 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-[#E2ECF5] p-4 md:p-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-end gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f3faff] text-[#64748B] hover:text-[#043570] transition-colors flex-shrink-0"
                      >
                        <Paperclip size={20} />
                      </motion.button>
                      <div className="flex-1 relative">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type your message..."
                          rows={1}
                          className="w-full px-4 py-3 bg-[#f3faff] border border-[#E2ECF5] rounded-xl text-sm text-[#020817] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#00c0ff] focus:border-transparent resize-none"
                          style={{ minHeight: "44px", maxHeight: "120px" }}
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!messageInput.trim()}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#043570] text-white hover:bg-[#032656] transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-[#f3faff] rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <MessageCircle className="text-[#00c0ff]" size={32} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[#020817] mb-2">Chat History</h3>
                  <p className="text-sm text-[#64748B] mb-6">
                    Select a conversation from the sidebar to view past messages
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowExpertsList(true)}
                    className="md:hidden bg-[#043570] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#032656] transition-colors"
                  >
                    View History
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
