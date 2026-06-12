"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, MessageCircle, Mail, Linkedin, Instagram } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface ShareActivityProps {
  className?: string;
}

export function ShareActivity({ className = "" }: ShareActivityProps) {
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const androidUrl = "https://play.google.com/store/apps/details?id=org.mantracare.ocd";
  const iosUrl = "https://apps.apple.com/tt/app/ocd-mantra-ocd-treatment-app/id1610120131";

  const getFullMessage = () =>
    t("share_message", { androidUrl, iosUrl });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getFullMessage());
      setCopied(true);
      toast.success(t("message_copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("failed_to_copy"));
    }
  };

  const handleShare = (platform: string) => {
    const message = getFullMessage();
    const encodedMessage = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent("https://play.google.com/store/apps/details?id=org.mantracare.ocd");
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodedMessage}`;
        break;
      case "gmail":
        url = `mailto:?subject=${encodeURIComponent(t("check_out_app"))}&body=${encodedMessage}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "instagram":
        copyToClipboard();
        toast.info(t("instagram_copy_hint"));
        return;
      default:
        break;
    }
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[1.5rem] bg-white border-2 border-slate-100 text-slate-700 font-bold text-sm tracking-wide hover:bg-slate-50 hover:border-slate-200 active:scale-[0.98] transition-all shadow-sm ${className}`}
      >
        <Share2 size={18} className="text-slate-500" strokeWidth={2.5} />
        {t("share_this_activity")}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setOpen(false)}>
          <div 
            className="w-full max-w-sm rounded-[2rem] bg-white border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div>
                <p className="font-bold text-slate-900 text-base">{t("share_this_activity")}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium tracking-wide">{t("help_others_find_strength")}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all shadow-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Copy message */}
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-slate-100 hover:border-slate-200 transition-all text-left shadow-sm active:scale-[0.98]"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
                  {copied ? <Check size={20} strokeWidth={2.5} /> : <Copy size={20} strokeWidth={2.5} />}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{copied ? t("copied") : t("copy_message")}</p>
                  <p className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">{t("includes_links")}</p>
                </div>
              </button>

              {/* Share row */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#25d366] text-white font-bold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  <MessageCircle size={18} strokeWidth={2.5} />
                  {t("whatsapp")}
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#0077b5] text-white font-bold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  <Linkedin size={18} strokeWidth={2.5} />
                  {t("linkedin")}
                </button>
                <button
                  onClick={() => handleShare("instagram")}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-bold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  <Instagram size={18} strokeWidth={2.5} />
                  {t("instagram")}
                </button>
                <button
                  onClick={() => handleShare("gmail")}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#ea4335] text-white font-bold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  <Mail size={18} strokeWidth={2.5} />
                  {t("email")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
