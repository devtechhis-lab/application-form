import { FieldError } from "@/components/ui/field";
import MajorCard from "@/components/MajorCard";
import { Trophy } from "lucide-react";
import RankPanel from "@/components/RankPanel";

const MAJORS = [
  {
    id: "cs",
    name: "Computer Science - Data Engineering and Web Technology",
    language: "French",
    total: "550 000 DA",
    firstInstallment: "275 000 DA",
  },
  {
    id: "scs",
    name: "Computer Science - CyberSecurity",
    language: "French",
    total: "550 000 DA",
    firstInstallment: "275 000 DA",
  },

  {
    id: "ebm",
    name: "Economic Science - Business Administration",
    language: "French/Arabic",
    total: "485 000 DA",
    firstInstallment: "242 500 DA",
  },
  {
    id: "cp",
    name: "Education Science - Guidance and Orientation",
    language: "Arabic",
    total: "410 000 DA",
    firstInstallment: "205 000 DA",
  },
  {
    id: "pl",
    name: "Law - Business Law",
    language: "Arabic",
    total: "400 000 DA",
    firstInstallment: "200 000 DA",
  },
];
const MAX_CHOICES = 2;

const ChooseMajor = ({ form }: { form: any }) => {
  const selectedIds: string[] = form.watch("majors") ?? [];
  const atLimit = selectedIds.length >= MAX_CHOICES;
  const rankOf = (id: string) => selectedIds.indexOf(id) + 1;
  const ranked = selectedIds.map((id) => MAJORS.find((m) => m.id === id));
  const toggleMajor = (id: string) => {
    const prev: string[] = form.getValues("majors") ?? [];
    let next: string[];
    if (prev.includes(id)) next = prev.filter((x) => x !== id);
    else if (prev.length >= MAX_CHOICES) next = prev;
    else next = [...prev, id];
    form.setValue("majors", next, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col">
        <h3 className="text-[16px] font-medium text-primary-500">
          Choose Your Major
        </h3>
        <p className="text-sm text-slate-500 ">
          Select 2 majors in order of preference from highest to lowest, tap a
          card to select.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {MAJORS.map((m) => (
            <MajorCard
              key={m.id}
              major={m}
              selectedRank={rankOf(m.id)}
              disabled={atLimit}
              onToggle={toggleMajor}
            />
          ))}
        </div>

        {form.formState.errors.majors && (
          <FieldError errors={[form.formState.errors.majors]} />
        )}
      </div>

      {/* ranking rail */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
          <Trophy size={13} className="text-[#1e3c73]" />
          Your ranking
        </div>
        <RankPanel ranked={ranked} />
      </div>
    </div>
  );
};
export default ChooseMajor;
