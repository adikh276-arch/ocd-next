import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface InsightScreenProps {
  onNext: (selection: string) => void;
  onBack: () => void;
}

const InsightScreen = ({ onNext }: InsightScreenProps) => {
    const { t } = useTranslation("clutter_journal");
    const OPTIONS = [
      t("a_fear_of_forgetting"),
      t("a_fear_of_not_having_enough"),
      t("a_memory_im_not_ready_to_lose"),
      t("a_part_of_my_identity"),
      t("guilt_or_responsibility"),
      t("love_for_someone"),
      t("something_i_cant_name_yet"),
    ];
      
      const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {t("what_did_you_notice_")}</h1>
        <p className="text-slate-500 font-medium leading-relaxed italic max-w-xl mx-auto">
          {t("sometimes_objects_hold_more_than_things_they_hold_")}</p>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase text-center mb-2">
          {t("what_is_this_object_really_holding_for_you")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={`w-full text-left p-6 rounded-[24px] border-2 transition-all font-bold text-sm ${
                selected === opt
                  ? "border-primary bg-primary text-white shadow-lg scale-[1.02]"
                  : "border-slate-100 bg-white text-slate-500 hover:border-primary/20 hover:bg-slate-50 italic"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl mt-10 bg-primary/5 rounded-[28px] p-6 border-2 border-primary/10 border-dashed mb-10">
        <p className="text-[11px] text-primary/70 font-bold leading-relaxed italic text-center uppercase tracking-widest">
          {t("naming_it_doesnt_mean_you_have_to_act_on_it_awaren")}</p>
      </div>

      <div className="w-full max-w-md shrink-0">
        <button
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
          className={`w-full py-5 rounded-[24px] font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
            selected
              ? "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
              : "bg-slate-100 text-slate-300 cursor-not-allowed border-2 border-slate-200/50 shadow-none"
          }`}
        >
          {t("i_see_it_now")}<ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default InsightScreen;
