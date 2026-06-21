import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*  Per-step schemas                                                          */
/* -------------------------------------------------------------------------- */

// Allowed values for the welcome screen selection. Kept in sync with the
// buttons in WelcomePage and the routing in ApplicationForm.
export const DEGREE_VALUES = ["license", "master"] as const;
export const TYPE_VALUES = ["newRegistration", "reRegistration"] as const;

// Welcome screen: a degree level and a registration type must both be chosen
// before the applicant can start the form.
export const WelcomeSchema = z.object({
  degree: z.enum(DEGREE_VALUES, {
    error: "Please select a degree level.",
  }),
  type: z.enum(TYPE_VALUES, {
    error: "Please select a registration type.",
  }),
});

export type WelcomeErrors = {
  degree?: string;
  type?: string;
};

// Algerian nationality value used across the form (stored in arabic).
const ALGERIAN_NATIONALITY = "Algerian - جزائري";
const ALGERIA_COUNTRY = "Algeria - الجزائر";
// Major ids that require choosing a language of study.
const LANGUAGE_REQUIRED_MAJORS = ["cs", "scs", "ste"];

export const PersonalInfoSchema = z
  .object({
    degree: z.string().optional(),
    type: z.string().optional(),
    firstName: z.string().min(2, "First Name is required."),
    lastName: z.string().min(2, "Last Name is required."),
    firstNameLatin: z.string().min(2, "First Name (Latin) is required."),
    lastNameLatin: z.string().min(2, "Last Name (Latin) is required."),
    gender: z.string().min(2, "Gender is required."),
    familyStatus: z.string().min(2, "Family Status is required."),
    nationality: z.string().min(2, "Nationality is required."),
    NIN: z.string().optional(),
    dateOfExpiration: z.union([z.string(), z.date()]).optional(),
    dateOfBirth: z
      .union([z.string(), z.date()])
      .refine((v) => v !== "" && v != null, "Date of Birth is required."),
    birthCountry: z.string().min(2, "Birth Country is required."),
    birthWillaya: z.string().optional(),
    birthCommune: z.string().optional(),
    birthAddress: z.string().optional(),
    residenceWillaya: z.string().min(1, "Residence Willaya is required."),
    residenceCommune: z.string().min(1, "Residence Commune is required."),
    residenceAddress: z.string().min(2, "Residence Address is required."),
    email: z
      .string()
      .email("Invalid email address.")
      .refine(
        (email) => !email.toLowerCase().endsWith("@icloud.com"),
        "iCloud email addresses are not allowed",
      ),
    phoneNumber1: z
      .string()
      .min(2, "Phone number is required.")
      .regex(/^(\+213|0)(5|6|7)[0-9]{8}$/, "Enter a valid phone number"),
    phoneNumber2: z
      .string()
      .min(2, "Phone number 2 is required.")
      .regex(/^(\+213|0)(5|6|7)[0-9]{8}$/, "Enter a valid phone number"),
    medicalCondition: z.string().min(2, "Medical Condition is required."),
  })
  .superRefine((data, ctx) => {
    // Algerians must provide a NIN and its expiration date.
    if (data.nationality === ALGERIAN_NATIONALITY) {
      if (!data.NIN || data.NIN.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["NIN"],
          message: "NIN is required.",
        });
      }
      if (!data.dateOfExpiration) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["dateOfExpiration"],
          message: "Date of Expiration is required.",
        });
      }
    }

    // Place of birth: inside Algeria -> willaya + commune; otherwise free address.
    if (data.birthCountry === ALGERIA_COUNTRY) {
      if (!data.birthWillaya) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["birthWillaya"],
          message: "Birth Willaya is required.",
        });
      }
      if (!data.birthCommune) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["birthCommune"],
          message: "Birth Commune is required.",
        });
      }
    } else if (data.birthCountry) {
      if (!data.birthAddress || data.birthAddress.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["birthAddress"],
          message: "Birth Address is required.",
        });
      }
    }
  });

// Full academic step (license): baccalaureate details + optional university info.
export const LicAcademicInfoSchema = z.object({
  baccalaureateSeries: z
    .string()
    .min(1, "Baccalaureate Register Number is required."),
  baccalaureateYear: z.string().min(1, "Baccalaureate Year is required."),
  baccalaureateAverage: z.string().min(1, "Baccalaureate Average is required."),
  baccalaureateMajor: z.string().min(1, "Baccalaureate Major is required."),
  mathematicsMark: z.string().min(1, "Mathematics Mark is required."),
  physicsMark: z.string().min(1, "Physics Mark is required."),
  highSchoolName: z.string().min(1, "High School Name is required."),
  highSchoolType: z.string().min(1, "High School Type is required."),
  currentUniversity: z.string().optional(),
  currentUniversityYear: z.string().optional(),
  currentUniversityMajor: z.string().optional(),
});

// Slim academic step (master): only current university info, all optional.
export const MasAcademicInfoSchema = z.object({
  currentUniversity: z.string().optional(),
  currentUniversityYear: z
    .string()
    .min(1, "Current University Year is required."),
  currentUniversityMajor: z.string().optional(),
});

// Major selection lives in form state as an array of major ids. New
// registrations require two ranked choices; re-registrations require one.
const languageRefine = (
  data: { majors?: string[]; language?: string },
  ctx: z.RefinementCtx,
) => {
  const needsLanguage = (data.majors ?? []).some((id) =>
    LANGUAGE_REQUIRED_MAJORS.includes(id),
  );
  if (needsLanguage && !data.language) {
    ctx.addIssue({
      code: "custom",
      path: ["language"],
      message: "Language of Study is required.",
    });
  }
};

// New registration: exactly two majors.
export const NewMajorSchema = z.object({
  majors: z
    .array(z.string())
    .length(2, "Please select two majors.")
    .default([]),
});

// Re-registration (license): exactly one major; language required for some.
export const ReLicMajorSchema = z
  .object({
    majors: z
      .array(z.string())
      .length(1, "Please select one major.")
      .default([]),
    language: z.string().optional(),
  })
  .superRefine(languageRefine);

// Re-registration (master): exactly one major; language never required.
export const ReMasMajorSchema = z.object({
  majors: z.array(z.string()).length(1, "Please select one major.").default([]),
  language: z.string().optional(),
});

// Full parents step (license): father + mother + guardian.
export const LicParentsInfoSchema = z.object({
  fatherFirstName: z.string().min(1, "Father's First Name is required."),
  fatherOccupation: z.string().optional(),
  fatherPhoneNumber: z
    .string()
    .min(10, "Father's Phone Number is required.")
    .regex(/^(\+213|0)(5|6|7)[0-9]{8}$/, "Enter a valid phone number"),
  fatherEmail: z.literal("").or(
    z
      .string()
      .email("Invalid email address.")
      .refine(
        (email) => !email.toLowerCase().endsWith("@icloud.com"),
        "iCloud email addresses are not allowed",
      ),
  ),
  motherFirstName: z.string().min(1, "Mother's First Name is required."),
  motherLastName: z.string().min(1, "Mother's Last Name is required."),
  motherOccupation: z.string().optional(),
  guardianFullName: z.string().min(1, "Guardian's Full Name is required."),
  guardianRelationship: z.string().min(1, "Relationship is required."),
  guardianEmail: z
    .string()
    .email("Invalid email address.")
    .refine(
      (email) => !email.toLowerCase().endsWith("@icloud.com"),
      "iCloud email addresses are not allowed",
    ),
  guardianPhoneNumber: z
    .string()
    .min(10, "Guardian's Phone Number is required.")
    .regex(/^(\+213|0)(5|6|7)[0-9]{8}$/, "Enter a valid phone number"),
});

// Slim parents step (master): guardian only.
export const MasParentsInfoSchema = z.object({
  guardianFullName: z.string().min(1, "Guardian's Full Name is required."),
  guardianRelationship: z.string().min(1, "Relationship is required."),
  guardianAddress: z.string().min(1, "Guardian's Address is required."),
  guardianEmail: z.string().email("Invalid email address."),
  guardianPhoneNumber: z
    .string()
    .min(10, "Guardian's Phone Number is required."),
});

/* -------------------------------------------------------------------------- */
/*  Per-variant combined schemas                                              */
/* -------------------------------------------------------------------------- */

// `.and` is used so the conditional (refined) object schemas compose cleanly.
export const NewLicenseSchema = PersonalInfoSchema.and(LicAcademicInfoSchema)
  .and(NewMajorSchema)
  .and(LicParentsInfoSchema);

export const NewMasterSchema = PersonalInfoSchema.and(MasAcademicInfoSchema)
  .and(NewMajorSchema)
  .and(MasParentsInfoSchema);

export const ReLicenseSchema = PersonalInfoSchema.and(ReLicMajorSchema);

export const ReMasterSchema = PersonalInfoSchema.and(ReMasMajorSchema);

/* -------------------------------------------------------------------------- */
/*  Per-step field lists (used by form.trigger to validate one step)          */
/* -------------------------------------------------------------------------- */

const personalFields = [
  "firstName",
  "lastName",
  "firstNameLatin",
  "lastNameLatin",
  "gender",
  "familyStatus",
  "nationality",
  "NIN",
  "dateOfExpiration",
  "dateOfBirth",
  "birthCountry",
  "residenceWillaya",
  "residenceCommune",
  "residenceAddress",
  "email",
  "phoneNumber1",
  "phoneNumber2",
  "medicalCondition",
];

const licAcademicFields = [
  "baccalaureateSeries",
  "baccalaureateYear",
  "baccalaureateAverage",
  "baccalaureateMajor",
  "mathematicsMark",
  "physicsMark",
  "highSchoolName",
  "highSchoolType",
];

const masAcademicFields = [
  "currentUniversity",
  "currentUniversityYear",
  "currentUniversityMajor",
];

const masMajorFields = ["majors"];
const licMajorFields = ["majors", "language"];

const licParentsFields = [
  "fatherFirstName",
  "fatherPhoneNumber",
  "fatherEmail",
  "motherFirstName",
  "motherLastName",
  "guardianFullName",
  "guardianRelationship",
  "guardianEmail",
  "guardianPhoneNumber",
];

const masParentsFields = [
  "guardianFullName",
  "guardianRelationship",
  "guardianAddress",
  "guardianEmail",
  "guardianPhoneNumber",
];

// Maps each variant's step index -> the field names to validate for that step.
export const fieldsByStep: Record<string, string[][]> = {
  newLicense: [
    personalFields,
    licAcademicFields,
    licMajorFields,
    licParentsFields,
    [], // review
  ],
  newMaster: [
    personalFields,
    masAcademicFields,
    masMajorFields,
    masParentsFields,
    [], // review
  ],
  reLicense: [personalFields, licMajorFields, []],
  reMaster: [personalFields, masMajorFields, []],
};
