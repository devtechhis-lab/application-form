import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import MajorCard from "@/components/MajorCard";
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Trophy } from "lucide-react";
import RankPanel from "@/components/RankPanel";

// const MAJORS = [
//   {
//     id: "cs",
//     name: "Computer Science - Computer Systems",
//     language: "English/French",
//     total: "550 000 DA",
//     firstInstallment: "275 000 DA",
//   },
//   {
//     id: "scs",
//     name: "Computer Science - Security of Computer Systems",
//     language: "English/French",
//     total: "550 000 DA",
//     firstInstallment: "275 000 DA",
//   },
//   {
//     id: "ste",
//     name: "Science & Technology - Electronics",
//     language: "English/French",
//     total: "550 000 DA",
//     firstInstallment: "275 000 DA",
//   },
//   {
//     id: "ebm",
//     name: "Economics - Eco & Business Management",
//     language: "English/French/Arabic",
//     total: "485 000 DA",
//     firstInstallment: "242 500 DA",
//   },
//   {
//     id: "cse",
//     name: "Commercial Sciences - E-commerce",
//     language: "English/French/Arabic",
//     total: "485 000 DA",
//     firstInstallment: "242 500 DA",
//   },
//   {
//     id: "cp",
//     name: "Social Sciences - Clinical Psychology",
//     language: "Arabic",
//     total: "410 000 DA",
//     firstInstallment: "205 000 DA",
//   },
//   {
//     id: "pl",
//     name: "Law - Public Law",
//     language: "Arabic",
//     total: "400 000 DA",
//     firstInstallment: "200 000 DA",
//   },
// ];
const MAX_CHOICES = 2;
const LANGUAGE_MAJORS = ["cs", "scs", "ste", "ebm", "cse"];

interface Major {
  id: string;
  name: string;
  language: string;
  total: string;
  firstInstallment: string;
}

const ChooseMajor = ({ form, Majors }: { form: any; Majors: Major[] }) => {
  const selectedIds: string[] = form.watch("majors") ?? [];
  const atLimit = selectedIds.length >= MAX_CHOICES;
  const rankOf = (id: string) => selectedIds.indexOf(id) + 1;
  const ranked = selectedIds.map((id) => Majors.find((m) => m.id === id));
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
          {Majors.map((m, i) => (
            <MajorCard
              key={i}
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

        {selectedIds.some((id) => LANGUAGE_MAJORS.includes(id)) && (
          <Controller
            name="language"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Language of Study
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    className="input"
                  >
                    <SelectValue
                      className="placeholder:text-slate-400"
                      placeholder="Select Language of Study"
                    />
                  </SelectTrigger>
                  <SelectContent className="p-3" position="item-aligned">
                    <SelectItem key="1" value="english - إنجليزية">
                      English
                    </SelectItem>
                    <SelectItem key="2" value="french - فرنسية">
                      French
                    </SelectItem>
                    <SelectItem key="3" value="arabic - العربية">
                      Arabic
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
