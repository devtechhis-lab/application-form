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
import { bacMajor, hsType, universityYear } from "@/data/data";

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
        {/* Baccalaureate Information */}
        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-medium text-primary-500">
            Baccalaureate Information
          </h3>
          <div className="flex flex-col gap-4">
            {/* baccalaureate series & year */}
            <div className=" flex flex-col sm:flex-row gap-4">
              {/* Baccalaureate Register Number */}
              <Controller
                name="baccalaureateSeries"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1 flex flex-col gap-1.5"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Baccalaureate Register Number
                      <span className="text-red-500 ml-0.5">*</span>
                    </FieldLabel>

                    <Input
                      type="text"
                      className="input"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your baccalaureate register number"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Baccalaureate Year */}
              <Controller
                name="baccalaureateYear"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Baccalaureate Year
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
                        <SelectValue placeholder="Select Your Baccalaureate Year" />
                      </SelectTrigger>
                      <SelectContent className="p-3" position="item-aligned">
                        <SelectItem key="1" value="2005">
                          2005
                        </SelectItem>
                        <SelectItem key="2" value="2006">
                          2006
                        </SelectItem>
                        <SelectItem key="3" value="2007">
                          2007
                        </SelectItem>
                        <SelectItem key="4" value="2008">
                          2008
                        </SelectItem>
                        <SelectItem key="5" value="2009">
                          2009
                        </SelectItem>
                        <SelectItem key="6" value="2010">
                          2010
                        </SelectItem>
                        <SelectItem key="7" value="2011">
                          2011
                        </SelectItem>
                        <SelectItem key="8" value="2012">
                          2012
                        </SelectItem>
                        <SelectItem key="9" value="2013">
                          2013
                        </SelectItem>
                        <SelectItem key="10" value="2014">
                          2014
                        </SelectItem>
                        <SelectItem key="11" value="2015">
                          2015
                        </SelectItem>
                        <SelectItem key="12" value="2016">
                          2016
                        </SelectItem>
                        <SelectItem key="13" value="2017">
                          2017
                        </SelectItem>
                        <SelectItem key="14" value="2018">
                          2018
                        </SelectItem>
                        <SelectItem key="15" value="2019">
                          2019
                        </SelectItem>
                        <SelectItem key="16" value="2020">
                          2020
                        </SelectItem>
                        <SelectItem key="17" value="2021">
                          2021
                        </SelectItem>
                        <SelectItem key="18" value="2022">
                          2022
                        </SelectItem>
                        <SelectItem key="19" value="2023">
                          2023
                        </SelectItem>
                        <SelectItem key="20" value="2024">
                          2024
                        </SelectItem>
                        <SelectItem key="21" value="2025">
                          2025
                        </SelectItem>
                        <SelectItem key="22" value="2026">
                          2026
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* baccalaureate average & major */}
            <div className=" flex flex-col sm:flex-row gap-4">
              {/* Baccalaureate Average */}
              <Controller
                name="baccalaureateAverage"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1 flex flex-col gap-1.5"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Baccalaureate Average
                      <span className="text-red-500 ml-0.5">*</span>
                    </FieldLabel>

                    <Input
                      type="number"
                      step={0.01}
                      min={0}
                      max={20}
                      className="input"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your baccalaureate average"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Baccalaureate Major */}
              <Controller
                name="baccalaureateMajor"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Baccalaureate Major
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
                        <SelectValue placeholder="Select Your Baccalaureate Major" />
                      </SelectTrigger>
                      <SelectContent className="p-3" position="item-aligned">
                        {bacMajor.map((m, i) => {
                          return (
                            <SelectItem key={i} value={m.value}>
                              {m.label}
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
            </div>

            {/* Mathematics and Physics Marks */}
            <div className=" flex flex-col sm:flex-row gap-4">
              {/* Mathematics Mark */}
              <Controller
                name="mathematicsMark"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1 flex flex-col gap-1.5"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Mathematics Mark
                      <span className="text-red-500 ml-0.5">*</span>
                    </FieldLabel>

                    <Input
                      type="number"
                      step={0.01}
                      min={0}
                      max={20}
                      className="input"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your mathematics mark"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Physics Mark */}
              <Controller
                name="physicsMark"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1 flex flex-col gap-1.5"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Physics Mark
                      <span className="text-red-500 ml-0.5">*</span>
                    </FieldLabel>

                    <Input
                      type="number"
                      step={0.01}
                      min={0}
                      max={20}
                      className="input"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your physics mark"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* High School Name And Type */}
            <div className=" flex flex-col sm:flex-row gap-4">
              {/* High School Name */}
              <Controller
                name="highSchoolName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1 flex flex-col gap-1.5"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      High School Name
                      <span className="text-red-500 ml-0.5">*</span>
                    </FieldLabel>

                    <Input
                      type="text"
                      className="input"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your high school name"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* High School Type */}
              <Controller
                name="highSchoolType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 flex flex-col gap-1.5"
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      High School Type
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
                        <SelectValue placeholder="Select Your High School Type" />
                      </SelectTrigger>
                      <SelectContent className="p-3" position="item-aligned">
                        {hsType.map((t, i) => {
                          return (
                            <SelectItem key={i} value={t.value}>
                              {t.label}
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
            </div>
          </div>
        </div>

        <span className="w-full h-0.5 bg-secondary rounded-full"></span>

        {/* University Information */}
        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-medium text-primary-500">
            University Information
          </h3>
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                        <SelectValue placeholder="Select Your Year" />
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
      </div>
    </div>
  );
};
export default AcademicInfo;
