import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universityYear } from "@/data/data";

const AcademicInfo = ({ form }: { form: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col">
        <h3 className="text-[16px] font-medium text-primary-500">
          Academic Background
        </h3>
        <p className="text-sm text-slate-500 ">
          Enter your academic history, including your previous studies and
          qualifications.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {/* Current University */}
        <Controller
          name="currentUniversity"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className=" flex flex-col gap-1.5"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                Current University
              </FieldLabel>

              <Input
                type="text"
                className="input"
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your current university name"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* current university major and year */}
        <div className=" flex flex-col sm:flex-row gap-4">
          {/* Current University Year */}
          <Controller
            name="currentUniversityYear"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex-1 flex flex-col gap-1.5"
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Current University Year
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
                    <SelectValue placeholder="Select Your Gender" />
                  </SelectTrigger>
                  <SelectContent className="p-3" position="item-aligned">
                    {universityYear.map((y, i) => {
                      return (
                        <SelectItem key={i} value={y.value}>
                          {y.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Current University Major */}
          <Controller
            name="currentUniversityMajor"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="flex-1 flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Current University Major
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your current university major"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default AcademicInfo;
