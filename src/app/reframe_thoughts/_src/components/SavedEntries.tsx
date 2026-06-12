import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, MessageSquare, CheckCircle2 } from "lucide-react";

import "@/lib/i18n";
import { useTranslation } from "react-i18next";

interface SavedEntriesProps {
    onBack: () => void;
}

interface ThoughtEntry {
    id: string;
    created_at: string;
    payload: {
        original_thought: string;
        distortions: string[];
        reframed_thought: string;
    };
}

const SavedEntries = ({ onBack }: SavedEntriesProps) => {
    const { t } = useTranslation("reframe_thoughts");
      const [entries, setEntries] = useState<ThoughtEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const res = await fetch(`/ocd/api/logs?slug=reframe_thoughts${ocd_user_id ? `&user_id=${ocd_user_id}` : ''}`);
                const result = await res.json();
                if (result.success) {
                    setEntries(result.data || []);
                }
            } catch (error: any) {
                console.error("Error fetching entries:", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEntries();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6 relative overflow-hidden">
            {/* Header */}
            <div className="w-full max-w-md mx-auto mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="w-9 h-9 rounded-full bg-card/90 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all active:scale-95 shrink-0"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="font-heading text-xl font-semibold text-foreground">{t("saved_entriestitle")}</h1>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 w-full max-w-md mx-auto relative z-10 overflow-y-auto pb-8 custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                        <p className="text-sm text-muted-foreground font-body">{t("saved_entriesloading")}</p>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="card-therapeutic text-center py-12">
                        <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                            <Clock className="text-muted-foreground/50" size={24} />
                        </div>
                        <p className="text-muted-foreground font-body text-sm">{t("saved_entriesno_entries")}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {entries.map((entry) => (
                            <div key={entry.id} className="card-therapeutic hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-body uppercase tracking-wider">
                                        <Clock size={12} />
                                        {new Date(entry.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <MessageSquare size={13} className="text-muted-foreground/60" />
                                            <span className="text-[11px] font-semibold text-muted-foreground/60 uppercase">{t("saved_entriesthe_thought")}</span>
                                        </div>
                                        <p className="text-sm text-foreground/80 font-body leading-relaxed pl-5 italic border-l-2 border-secondary">
                                            "{entry.payload?.original_thought}"
                                        </p>
                                    </div>

                                    {entry.payload?.distortions?.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pl-5">
                                            {entry.payload.distortions.map((d: string) => (
                                                <span key={d} className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] text-primary/70 font-body uppercase">
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <CheckCircle2 size={13} className="text-primary/60" />
                                            <span className="text-[11px] font-semibold text-primary/60 uppercase">{t("saved_entriesreframed")}</span>
                                        </div>
                                        <p className="text-sm text-foreground font-body leading-relaxed pl-5 border-l-2 border-primary/20">
                                            {entry.payload?.reframed_thought}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedEntries;
