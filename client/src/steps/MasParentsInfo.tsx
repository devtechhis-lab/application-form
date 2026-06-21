import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const ParentsInfo = ({ form }: { form: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col">
        <h3 className="text-[16px] font-medium text-primary-500">
          Parents Information
        </h3>
        <p className="text-sm text-slate-500 ">
          Please provide your parent and guardian's personal and contact
          information.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {/* Guardian Full Name */}
        <Controller
          name="guardianFullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className="flex-1 flex flex-col gap-1.5"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                Full Name of the Person Responsible for Paying Tuition Fees
                <span className="text-red-500 ml-0.5">*</span>
              </FieldLabel>

              <Input
                type="text"
                className="input"
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Enter the full name of the person responsible for paying tuition fees"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Guardian Relationship and Address */}
        <div className=" flex flex-col sm:flex-row gap-4">
          {/* Guardian Relationship to the Student */}
          <Controller
            name="guardianRelationship"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="flex-1 flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Relationship to the Student
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the relationship to the student"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Guardian Address */}
          <Controller
            name="guardianAddress"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="flex-1 flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Address
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your guardian's address"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Guardian Email and Phone Number */}
        <div className=" flex flex-col sm:flex-row gap-4">
          {/* Guardian Email */}
          <Controller
            name="guardianEmail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="flex-1 flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Email
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your guardian's email address"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Guardian Phone Number */}
          <Controller
            name="guardianPhoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="flex-1 flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Phone Number
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your guardian's phone number"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <span className="w-full h-0.5 bg-secondary rounded-full"></span>
      </div>
    </div>
  );
};
export default ParentsInfo;
