import { GraduationCap, Languages, Wallet } from "lucide-react";

function MajorCard({
  major,
  selectedRank,
  disabled,
  onToggle,
}: {
  major: any;
  selectedRank: number;
  disabled: boolean;
  onToggle: (id: string) => void;
}) {
  const selected = selectedRank > 0;
  return (
    <button
      type="button"
      onClick={() => !(!selected && disabled) && onToggle(major.id)}
      className={`group relative flex w-full flex-col rounded-xl border p-4 text-left transition ${
        selected
          ? "border-[#1e3c73] bg-[#1e3c73]/[0.04] ring-1 ring-[#1e3c73]"
          : disabled
            ? "cursor-not-allowed border-[#d2d8e3] bg-slate-50 opacity-55"
            : "border-[#d2d8e3] bg-white hover:border-[#1e3c73] hover:shadow-sm"
      }`}
    >
      {/* selection indicator */}
      <span
        className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition ${
          selected
            ? "bg-[#1e3c73] text-white"
            : "border border-[#d2d8e3] text-transparent group-hover:border-[#1e3c73]"
        }`}
      >
        {selected ? selectedRank : ""}
      </span>

      <div className="mb-3 flex items-start gap-2.5 pr-8">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#d2d8e3] text-[#1e3c73]">
          <GraduationCap size={18} />
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-800">
            {major.name}
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <Languages size={13} />
            {major.language}
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#d2d8e3] pt-3">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-slate-400">
            Total price
          </div>
          <div className="text-[13px] font-semibold text-[#1e3c73]">
            {major.total}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-slate-400">
            <Wallet size={11} />
            First installment
          </div>
          <div className="text-[13px] font-semibold text-slate-700">
            {major.firstInstallment}
          </div>
        </div>
      </div>
    </button>
  );
}

export default MajorCard;
