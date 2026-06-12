import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

interface AuthContextType {
    userId: number | null;
    loading: boolean;
    isMock: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation("mood_tracker");
      const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMock, setIsMock] = useState(false);

    const [loadingMessage, setLoadingMessage] = useState("Preparing your journal...");

    useEffect(() => {
        const messages = [
            t("setting_the_mood"),
            t("getting_things_ready_for_you"),
            t("personalizing_your_experience"),
            t("creating_a_safe_space"),
            t("almost_there")
        ];
        let i = 0;
        const interval = setInterval(() => {
              i = (i + 1) % messages.length;
            setLoadingMessage(messages[i]);
        }, 1500);

        const handleAuth = async () => {
            const storedId = sessionStorage.getItem('user_id');
            if (storedId) {
                setUserId(parseInt(storedId, 10));
            }
            setLoading(false);
            return;
        };

        handleAuth();
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ userId, loading, isMock }}>
            {loading ? (
                <div className="flex min-h-screen items-center justify-center bg-background">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg"></div>
                        <p className="text-sm font-bold text-foreground animate-pulse tracking-wide italic">{loadingMessage}</p>
                    </div>
                </div>
            ) : !userId ? (
                <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
                    <div className="flex max-w-sm flex-col items-center gap-6 animate-fade-in">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                            <span className="text-4xl">🔐</span>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-black text-foreground">{t("access_required")}</h1>
                            <p className="text-muted-foreground leading-relaxed">
                                {t("please_access_this_journal_thr")}</p>
                        </div>
                        <div className="w-full rounded-2xl bg-secondary/50 p-4 text-xs text-muted-foreground">
                            <p className="font-semibold mb-1">{t("testing_locally")}</p>
                            <p>{t("append_a_token_to_your_url")}<br /> <code className="text-primary font-bold">{t("token_your_test_token")}</code></p>
                        </div>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const { t } = useTranslation("mood_tracker");
      const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
