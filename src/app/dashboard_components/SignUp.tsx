import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Globe, Check, User, Mail, Phone, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    inviteCode: "",
  });
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      hasSubscription: Math.random() > 0.5,
      showAppPopup: true,
    };
    
    localStorage.setItem("mantraUser", JSON.stringify(user));
    
    router.push("/dashboard");
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      name: "Demo User",
      email: "demo@example.com",
      phone: "+911234567890",
      hasSubscription: true,
      showAppPopup: true,
    };
    
    localStorage.setItem("mantraUser", JSON.stringify(user));
    router.push("/dashboard");
  };

  const handleSignIn = () => {
    const user = {
      name: "Returning User",
      email: "user@example.com",
      phone: "+911234567890",
      hasSubscription: false,
      showAppPopup: true,
    };
    
    localStorage.setItem("mantraUser", JSON.stringify(user));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -left-32 top-1/4 w-96 h-96 bg-[#E8F4FD] rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-[#E3F2FD] rounded-full blur-3xl"></div>
      </div>

      {/* Logo */}
      <motion.div 
        className="absolute top-5 md:top-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" className="md:w-10 md:h-10">
              <circle cx="20" cy="20" r="20" fill="#1E293B"/>
              <path d="M15 15C15 12.7909 16.7909 11 19 11C21.2091 11 23 12.7909 23 15V20C23 22.2091 21.2091 24 19 24C16.7909 24 15 22.2091 15 20V15Z" fill="white"/>
              <path d="M25 20C25 17.7909 23.2091 16 21 16C18.7909 16 17 17.7909 17 20V25C17 27.2091 18.7909 29 21 29C23.2091 29 25 27.2091 25 25V20Z" fill="white" fillOpacity="0.8"/>
            </svg>
          </div>
          <span className="text-xl md:text-2xl text-[#020817]">MantraCare</span>
        </div>
      </motion.div>

      {/* Sign Up Card */}
      <motion.div 
        className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-md mt-14 md:mt-0"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl text-[#020817] mb-2">Create Account</h2>
          <p className="text-[#64748B] text-sm">Join your wellness journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-11 pl-10 bg-white border-[#E2ECF5] text-sm focus:border-[#2D9CDB] focus:ring-[#E8F4FD]"
            />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-11 pl-10 bg-white border-[#E2ECF5] text-sm focus:border-[#2D9CDB] focus:ring-[#E8F4FD]"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-3 border border-[#E2ECF5] rounded-lg bg-[#F6F8FB] min-w-[72px] h-11">
              <span className="text-base">🇮🇳</span>
              <span className="text-xs text-[#64748B]">+91</span>
            </div>
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="h-11 pl-10 bg-white border-[#E2ECF5] text-sm focus:border-[#2D9CDB] focus:ring-[#E8F4FD]"
              />
            </div>
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="h-11 pl-10 pr-10 bg-white border-[#E2ECF5] text-sm focus:border-[#2D9CDB] focus:ring-[#E8F4FD]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E2ECF5] hover:text-[#64748B] transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <motion.div
            initial={false}
            animate={{ height: showInviteCode ? "auto" : 0, opacity: showInviteCode ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Input
              type="text"
              placeholder="Invite Code (Optional)"
              value={formData.inviteCode}
              onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
              className="h-11 bg-white border-[#E2ECF5] text-sm"
            />
          </motion.div>
          
          <button
            type="button"
            onClick={() => setShowInviteCode(!showInviteCode)}
            className="text-xs md:text-sm text-[#2D9CDB] hover:text-[#1E293B] transition-colors flex items-center gap-1 ml-auto"
          >
            {showInviteCode ? "Hide" : "Have"} an Invite Code?
          </button>
          
          <motion.button
            type="submit" 
            disabled={isLoading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-11 md:h-12 bg-[#2D9CDB] hover:shadow-lg hover:shadow-[#2D9CDB]/30 text-white rounded-xl transition-all font-semibold disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? (
              <motion.div
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Creating Account...
              </motion.div>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <div className="my-5 md:my-6 flex items-center">
          <div className="flex-1 h-px bg-[#E2ECF5]"></div>
          <span className="px-4 text-xs md:text-sm text-[#64748B]">or continue with</span>
          <div className="flex-1 h-px bg-[#E2ECF5]"></div>
        </div>

        <motion.button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-11 md:h-12 flex items-center justify-center gap-3 bg-white border-2 border-[#E2ECF5] rounded-xl hover:border-[#2D9CDB] hover:bg-[#F6F8FB] hover:shadow-md transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-[#020817]">Continue with Google</span>
        </motion.button>

        <p className="text-center text-xs md:text-sm text-[#64748B] mt-5 md:mt-6">
          Already have an account?{" "}
          <motion.button
            onClick={handleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#0D9488] hover:text-[#1E293B] font-semibold transition-colors"
          >
            Sign In
          </motion.button>
        </p>

        <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs md:text-sm cursor-pointer hover:text-slate-700 transition-colors">
          <Globe size={13} className="text-[#64748B]" />
          <span className="text-[#64748B]">English (US)</span>
        </div>

        {/* Trust indicators */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#EEF4FF]">
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs text-[#64748B]">
            <div className="flex items-center gap-1">
              <Check className="text-[#2196F3]" size={11} />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="text-[#2196F3]" size={11} />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="text-[#27AE60]" size={11} />
              <span>Encrypted</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
