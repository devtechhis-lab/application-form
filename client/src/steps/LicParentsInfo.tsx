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
        {/* Father's Information */}
        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-medium text-primary-500">
            Father's Information
          </h3>
          <div className="flex flex-col gap-4">
            {/* Father's First Name */}
            <Controller
              name="fatherFirstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex-1 flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                    First Name
                    <span className="text-red-500 ml-0.5">*</span>
                  </FieldLabel>

                  <Input
                    type="text"
                    className="input"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your father's first name"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Father Occupation */}
            <Controller
              name="fatherOccupation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex-1 flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                    Occupation
                  </FieldLabel>

                  <Input
                    type="text"
                    className="input"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your father's occupation"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Father's Email & Phone Number */}
            <div className=" flex flex-col sm:flex-row gap-4">
              {/* Father's Phone Number */}
              <Controller
                name="fatherPhoneNumber"
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
                      placeholder="Enter your father's phone number"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Father's Email */}
              <Controller
                name="fatherEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1 flex flex-col gap-1.5"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Email
                    </FieldLabel>

                    <Input
                      type="text"
                      className="input"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your father's email address"
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

        <span className="w-full h-0.5 bg-secondary rounded-full"></span>

        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-medium text-primary-500">
            Mother's Information
          </h3>
          <div className="flex flex-col gap-4">
            {/* Mother's First Name & Last Name */}
            <div className=" flex flex-col sm:flex-row gap-4">
              {/* Mother's First Name */}
              <Controller
                name="motherFirstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1 flex flex-col gap-1.5"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      First Name
                      <span className="text-red-500 ml-0.5">*</span>
                    </FieldLabel>

                    <Input
                      type="text"
                      className="input"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your mother's first name"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Mother's Last Name */}
              <Controller
                name="motherLastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className="flex-1 flex flex-col gap-1.5"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Last Name
                      <span className="text-red-500 ml-0.5">*</span>
                    </FieldLabel>

                    <Input
                      type="text"
                      className="input"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your mother's last name"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Mother Occupation */}
            <Controller
              name="motherOccupation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex-1 flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                    Occupation
                  </FieldLabel>

                  <Input
                    type="text"
                    className="input"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your mother's occupation"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-medium text-primary-500">
            Guardian Information
          </h3>
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
                    Guardian's Address
                    <span className="text-red-500 ml-0.5">*</span>
                  </FieldLabel>

                  <Input
                    type="text"
                    className="input"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the guardian's address"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParentsInfo;
