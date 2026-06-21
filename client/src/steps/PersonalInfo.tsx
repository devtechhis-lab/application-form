import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { date } from "zod";
import { format } from "date-fns";
import { useState } from "react";
import addresses from "@/data/addresses.json";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { countries } from "@/data/countries";
import { familyStatus, gender, medicalCondition } from "@/data/data";

const PersonalInfo = ({ form }: { form: any }) => {
  const [openDateOfBirth, setOpenDateOfBirth] = useState(false);
  const [openDateOfExpiration, setOpenDateOfExpiration] = useState(false);

  // Conditional UI is derived from form state so it survives step navigation.
  const isAlgerian = form.watch("nationality") === "Algerian - جزائري";
  const isBirthInAlgeria = form.watch("birthCountry") === "Algeria - الجزائر";
  const birthWillay = parseInt(form.watch("birthWillaya")) || 0;
  const ResidenceWillay = parseInt(form.watch("residenceWillaya")) || 0;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col">
        <h3 className="text-[16px] font-medium text-primary-500">
          Personal Information
        </h3>
        <p className="text-sm text-slate-500 ">
          Tell us about yourself. Fields marked with an asterisk are required.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {/* First Name & Last Name (arabic) */}
        <div className=" flex flex-col sm:flex-row gap-4">
          {/* First Name(arabic) */}
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className=" flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  First Name (In Arabic)
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your first name in arabic"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Last Name(arabic) */}
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className=" flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Last Name (In Arabic)
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your last name in arabic"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* First Name & Last Name (latin) */}
        <div className=" flex flex-col sm:flex-row gap-4">
          {/* First Name (latin) */}
          <Controller
            name="firstNameLatin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className=" flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  First Name (In Latin)
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your first name in latin"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Last Name (latin) */}
          <Controller
            name="lastNameLatin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className=" flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Last Name (In Latin)
                  <span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your last name in latin"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Gender & Family status */}
        <div className=" flex flex-col sm:flex-row gap-4">
          {/* Gender */}
          <Controller
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Gender
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
                    {gender.map((g) => {
                      return (
                        <SelectItem key={g.id} value={g.value}>
                          {g.label}
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

          {/* Family Status */}
          <Controller
            name="familyStatus"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Family status
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
                    <SelectValue placeholder="Select Your Family status" />
                  </SelectTrigger>
                  <SelectContent className="p-3" position="item-aligned">
                    {familyStatus.map((f) => {
                      return (
                        <SelectItem key={f.id} value={f.value}>
                          {f.label}
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

        {/* Nationality */}
        <Controller
          name="nationality"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                Nationality
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
                    placeholder="Select Your Nationality"
                  />
                </SelectTrigger>
                <SelectContent className="p-3" position="item-aligned">
                  {countries.map((country, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={
                          country.nationality_en +
                          " - " +
                          country.nationality_ar
                        }
                      >
                        {country.nationality_en}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* NIN & Date of expiration */}
        {isAlgerian && (
          <div className=" flex flex-col sm:flex-row gap-4">
            {/* NIN */}
            <Controller
              name="NIN"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  className=" flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                    NIN (National Identification Number)
                    <span className="text-red-500 ml-0.5">*</span>
                  </FieldLabel>

                  <Input
                    type="text"
                    className="input"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your NIN"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Date of expiration */}
            <Controller
              name="dateOfExpiration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  className="flex flex-col gap-1.5"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                    Date of Expiration
                    <span className="text-red-500 ml-0.5">*</span>
                  </FieldLabel>
                  <Popover
                    open={openDateOfExpiration}
                    onOpenChange={setOpenDateOfExpiration}
                  >
                    <PopoverTrigger asChild>
                      <button
                        data-empty={!date}
                        className=" input text-slate-400 h-8 flex items-center justify-between w-full"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <p className="text-slate-400">
                            Select date of expiration
                          </p>
                        )}
                        <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenDateOfExpiration(false);
                        }}
                        disabled={{ before: new Date() }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        )}

        {/* Date Of Birth */}
        <Controller
          name="dateOfBirth"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className="flex flex-col gap-1.5"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                Date of Birth
                <span className="text-red-500 ml-0.5">*</span>
              </FieldLabel>
              <Popover open={openDateOfBirth} onOpenChange={setOpenDateOfBirth}>
                <PopoverTrigger asChild>
                  <button
                    data-empty={!date}
                    className=" input text-slate-400 h-8 flex items-center justify-between w-full"
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <p className="text-slate-400">Select date of birth</p>
                    )}
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpenDateOfBirth(false);
                    }}
                    defaultMonth={field.value ?? new Date(2010, 11, 1)}
                    startMonth={new Date(1900, 0)}
                    endMonth={new Date(2010, 11)}
                    disabled={{ after: new Date(2010, 11, 31) }}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <span className="w-full h-0.5 bg-secondary rounded-full"></span>

        {/* Place Of Birth */}
        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-medium text-primary-500">
            Place of Birth
          </h3>
          <div className="flex flex-col gap-4">
            {/* Country Of Birth */}
            <Controller
              name="birthCountry"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                    Country
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
                      <SelectValue placeholder="Select Your Birth Country" />
                    </SelectTrigger>
                    <SelectContent className="p-3" position="item-aligned">
                      {countries.map((country, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={country.name_en + " - " + country.name_ar}
                          >
                            {country.name_en}
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

            {/* willaya & commune Of Birth */}
            {isBirthInAlgeria ? (
              <div className=" flex flex-col sm:flex-row gap-4">
                {/* willaya of birth */}
                <Controller
                  name="birthWillaya"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className=" flex-1"
                    >
                      <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                        Willaya
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
                          <SelectValue placeholder="Select Your Willaya of Birth" />
                        </SelectTrigger>
                        <SelectContent className="p-3" position="item-aligned">
                          {addresses.map((address, index) => {
                            return (
                              <>
                                <SelectItem
                                  key={index}
                                  value={String(address.wilayaCode)}
                                >
                                  {address.nameFr}
                                </SelectItem>
                              </>
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

                {/* Commune Of Birth */}
                <Controller
                  name="birthCommune"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className=" flex-1"
                    >
                      <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                        Commune
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
                          <SelectValue placeholder="Select Your Commune of Birth" />
                        </SelectTrigger>
                        <SelectContent className="p-3" position="item-aligned">
                          {addresses[birthWillay - 1]?.communes?.map(
                            (commune, index) => {
                              return (
                                <SelectItem
                                  key={index}
                                  value={commune.nameFr + " " + commune.nameAr}
                                >
                                  {commune.nameFr}
                                </SelectItem>
                              );
                            },
                          )}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            ) : (
              <Controller
                name="birthAddress"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className=" flex flex-col gap-1.5"
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
                      placeholder="Enter Your Birth Address"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </div>
        </div>

        <span className="w-full h-0.5 bg-secondary rounded-full"></span>

        {/* Residence Address */}
        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-medium text-primary-500">
            Residence Address
          </h3>
          <div className="flex flex-col gap-4">
            {/* willaya & commune */}
            <div className=" flex flex-col sm:flex-row gap-4">
              {/* Willaya */}
              <Controller
                name="residenceWillaya"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className=" flex-1">
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Willaya
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
                        <SelectValue placeholder="Select Your Residence Willaya" />
                      </SelectTrigger>
                      <SelectContent className="p-3" position="item-aligned">
                        {addresses.map((address, index) => {
                          return (
                            <>
                              <SelectItem
                                key={index}
                                value={String(address.wilayaCode)}
                              >
                                {address.nameFr}
                              </SelectItem>
                            </>
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

              {/* Commune */}
              <Controller
                name="residenceCommune"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className=" flex-1">
                    <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                      Commune
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
                        <SelectValue placeholder="Select Your Residence Commune" />
                      </SelectTrigger>
                      <SelectContent className="p-3" position="item-aligned">
                        {addresses[ResidenceWillay - 1]?.communes?.map(
                          (commune, index) => {
                            return (
                              <SelectItem
                                key={index}
                                value={commune.nameFr + " " + commune.nameAr}
                              >
                                {commune.nameFr}
                              </SelectItem>
                            );
                          },
                        )}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Address */}
            <Controller
              name="residenceAddress"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  className=" flex flex-col gap-1.5"
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
                    placeholder="Enter your full address"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        <span className="w-full h-0.5 bg-secondary rounded-full"></span>

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className=" flex flex-col gap-1.5"
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
                placeholder="Enter your email"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Phone Numbers */}
        <div className=" flex flex-col sm:flex-row gap-4">
          {/* Phone Number 1 */}
          <Controller
            name="phoneNumber1"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className=" flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Phone Number 1<span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your first phone number"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone Number 2 */}
          <Controller
            name="phoneNumber2"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className=" flex flex-col gap-1.5"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                  Phone Number 2<span className="text-red-500 ml-0.5">*</span>
                </FieldLabel>

                <Input
                  type="text"
                  className="input"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your second phone number"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Medical Condition */}
        <Controller
          name="medicalCondition"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <FieldLabel className="text-xs font-medium text-slate-500 gap-0">
                Medical Condition
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
                  <SelectValue placeholder="Select Your Medical Condition" />
                </SelectTrigger>
                <SelectContent className="p-3" position="item-aligned">
                  {medicalCondition.map((condition, index) => {
                    return (
                      <SelectItem key={index} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </div>
  );
};
export default PersonalInfo;
