import { ActivityHistoryDrawer } from "@/components/ActivityHistoryDrawer";
import { BookOpen, PlusCircle, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface JournalScreenProps {
  onStartEntry: () => void;
  onBack: () => void;
}

const JournalScreen = ({ onStartEntry }: JournalScreenProps) => {
    const { t } = useTranslation("clutter_journal");
      return (
        <div className="w-full flex flex-col items-center">
          {/* Header */}
          <div className="w-full flex justify-end mb-6">
            
          </div>

          <div className="w-full flex flex-col items-center text-center space-y-10">
            <div className="flex justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[48px] border-2 border-slate-100 shadow-inner flex items-center justify-center text-primary transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                 <BookOpen size={64} strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("my_journal_")}</h1>
              <p className="text-slate-500 font-medium leading-relaxed italic">
                {t("every_entry_is_a_moment_of_courage_revisit_your_re")}</p>
            </div>

            <div className="w-full max-w-2xl bg-primary/5 border-2 border-primary/10 border-dashed rounded-[28px] p-10 flex flex-col items-center">
              <p className="text-lg font-bold text-primary leading-relaxed italic text-center">
                {t("your_journal_is_waiting_start_your_first_reflectio")}</p>
            </div>

            <div className="w-full max-w-md pt-6">
              <button
                onClick={onStartEntry}
                className="w-full py-5 rounded-[24px] bg-primary text-white font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
              >
                <PlusCircle size={20} />
                {t("start_todays_entry")}<ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      );
};

export default JournalScreen;
