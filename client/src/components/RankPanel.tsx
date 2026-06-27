import { Trophy } from "lucide-react";

const RANK_LABELS = ["1st choice", "2nd choice"];

function RankPanel({ ranked }: { ranked: any[] }) {
  if (ranked.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#d2d8e3] bg-slate-50 px-4 py-8 text-center">
        <Trophy size={22} className="text-[#1e3c73]/40" />
        <p className="mt-2 text-xs text-slate-500">
          Select up to three majors.
          <br />
          Your ranked choices will appear here.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-2.5">
      {ranked.map((m, i) => (
        <div
          key={m.id}
          className="flex items-center gap-3 rounded-xl border border-[#d2d8e3] bg-white p-3"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3c73] text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-slate-800">
              {m?.name ? m.name : "Unknown Major"}
            </div>
            <div className="text-[11px] text-slate-500">
              {/* {RANK_LABELS[i]} · {m.language} · {m.firstInstallment} first */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RankPanel;
