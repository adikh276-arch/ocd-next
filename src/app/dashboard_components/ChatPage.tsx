import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Send, Paperclip, Video, Phone, MoreVertical, Check, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "provider";
  timestamp: string;
  read: boolean;
}

export function ChatPage() {
  const router = useRouter();
  const { providerId } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "provider",
      timestamp: "10:00 AM",
      read: true,
    },
    {
      id: "2",
      text: "Hi, I wanted to discuss my recent appointment.",
      sender: "user",
      timestamp: "10:02 AM",
      read: true,
    },
    {
      id: "3",
      text: "Of course! I'm here to help. What would you like to know?",
      sender: "provider",
      timestamp: "10:03 AM",
      read: true,
    },
  ]);

  // Mock provider data - in real app, fetch based on providerId
  const provider = {
    id: providerId || "1",
    name: "Dr. Sarah Johnson",
    specialty: "Mental Health Counselor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    status: "online",
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile Nav */}
      <MobileNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[1000px] w-full mx-auto flex flex-col h-screen pt-[72px] md:pt-0">
          {/* Chat Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-b border-[#E2E8F0] px-4 md:px-6 py-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push(-1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
                >
                  <ArrowLeft size={20} className="text-[#64748B]" />
                </button>

                <Avatar className="w-10 h-10">
                  <AvatarImage src={provider.avatar} alt={provider.name} />
                  <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-base font-semibold text-[#1a1a1a]">{provider.name}</h2>
                  <p className="text-xs text-[#64748B]">{provider.specialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
                >
                  <Video size={20} className="text-[#64748B]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
                >
                  <Phone size={20} className="text-[#64748B]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-colors"
                >
                  <MoreVertical size={20} className="text-[#64748B]" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
            {messages.map((message, index) => (
              <div key={message.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-[#2563EB] text-white rounded-br-md"
                          : "bg-white border border-[#E2E8F0] text-[#1a1a1a] rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 px-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <span className="text-xs text-[#94A3B8]">{message.timestamp}</span>
                      {message.sender === "user" && (
                        <span className="text-xs">
                          {message.read ? <CheckCheck size={14} className="text-[#2563EB]" /> : <Check size={14} className="text-[#94A3B8]" />}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
                
                {/* Show Join button after the specific message */}
                {message.id === "3" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 1) * 0.05 }}
                    className="flex justify-center mt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-xl font-semibold text-sm shadow-sm transition-colors"
                    >
                      Join
                    </motion.button>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-t border-[#E2E8F0] px-4 md:px-6 py-4"
          >
            <div className="flex items-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#F1F5F9] transition-colors flex-shrink-0"
              >
                <Paperclip size={20} className="text-[#64748B]" />
              </motion.button>

              <div className="flex-1 bg-[#F1F5F9] rounded-2xl px-4 py-3">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full bg-transparent text-sm text-[#1a1a1a] placeholder:text-[#94A3B8] outline-none resize-none"
                  style={{ maxHeight: "120px" }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  messageInput.trim()
                    ? "bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
                    : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                }`}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
