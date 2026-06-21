import { sheets } from "../index.js";
import { schemaForVariant } from "../validation/schemas.js";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import addresses from "../data/addresses.json" with { type: "json" };
import { externMajors } from "../data/data.js";
import dotenv from "dotenv";
dotenv.config();

// Map a major id (e.g. "cs") to its display name. Falls back to the id when
// it isn't found so we never lose the raw value.
const majorIdToName = new Map(externMajors.map((m) => [m.id, m.name]));
const majorName = (id) => (id == null ? null : (majorIdToName.get(id) ?? id));

export const newRegistration = async (req, res) => {
  // Pick the validation schema based on the registration variant.
  const schema = schemaForVariant(req.body?.type, req.body?.degree);
  if (!schema) {
    return res.status(400).json({
      success: false,
      error: "Unknown registration type or degree.",
    });
  }

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const {
    type,
    degree,

    // Personal Information
    firstName,
    lastName,
    firstNameLatin,
    lastNameLatin,
    gender,
    familyStatus,
    nationality,
    NIN,
    dateOfExpiration,
    dateOfBirth,
    birthCountry,
    birthWillaya,
    birthCommune,
    birthAddress,
    residenceWillaya,
    residenceCommune,
    residenceAddress,
    email,
    phoneNumber1,
    phoneNumber2,
    medicalCondition,

    // Academic Background
    baccalaureateSeries,
    baccalaureateYear,
    baccalaureateAverage,
    baccalaureateMajor,
    mathematicsMark,
    physicsMark,
    highSchoolName,
    highSchoolType,
    currentUniversity,
    currentUniversityYear,
    currentUniversityMajor,

    // Parents Information
    fatherFirstName,
    fatherOccupation,
    fatherPhoneNumber,
    fatherEmail,
    motherFirstName,
    motherLastName,
    motherOccupation,
    guardianFullName,
    guardianRelationship,
    guardianEmail,
    guardianPhoneNumber,
    guardianAddress,

    // Choosing Majors
    majors,
    language,
  } = parsed.data;

  try {
    if (type === "newRegistration" && degree === "license") {
      // const pdfBytes = fs.readFileSync("form.pdf");

      // const pdfDoc = await PDFDocument.load(pdfBytes);

      // const form = pdfDoc.getForm();

      // form.getTextField("firstName").setText(firstName);
      // form.getTextField("lastName").setText(lastName);
      // form.getTextField("firstNameLatin").setText(firstNameLatin);
      // form.getTextField("lastNameLatin").setText(lastNameLatin);
      // form.getTextField("nationality").setText(nationality);
      // form.getTextField("NIN").setText(NIN);
      // form.getTextField("dateOfExpiration").setText(dateOfExpiration);
      // form.getTextField("residenceCountry").setText("Algeria");
      // form.getTextField("residenceWilaya").setText(residenceWillaya);
      // form.getTextField("email").setText(email);
      // form.getTextField("phoneNumber1").setText(phoneNumber1);
      // form.getTextField("phoneNumber2").setText(phoneNumber2);
      // form.getTextField("fatherName").setText(fatherFirstName);
      // form.getTextField("fatherOccupation").setText(fatherOccupation);
      // form
      //   .getTextField("motherFullName")
      //   .setText(motherFirstName + " " + motherLastName);
      // form.getTextField("motherOccupation").setText(motherOccupation);
      // form.getTextField("fatherEmail").setText(fatherEmail);
      // form.getTextField("fatherPhoneNumber").setText(fatherPhoneNumber);
      // form.getTextField("medicalCondition").setText(medicalCondition);
      // form.getTextField("bac").setText("Baccaluareate");
      // form.getTextField("highSchoolName").setText(highSchoolName);
      // form.getTextField("bacYear").setText(baccalaureateYear);
      // form.getTextField("bacResult").setText(baccalaureateAverage);
      // form.getTextField("highSchoolType").setText(highSchoolType);
      // form.getTextField("bacSeries").setText(baccalaureateSeries);
      // form.getTextField("currentUniversity").setText(currentUniversity);
      // form.getTextField("currentMajor").setText(currentUniversityMajor);
      // form.getTextField("currentYear").setText(currentUniversityYear);

      // const result = await pdfDoc.save();

      // fs.writeFileSync("filled.pdf", result);

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet6!A:D",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [
            [
              "License - ليسانس",
              "New-Registration - تسجيل جديد",
              firstName,
              lastName,
              firstNameLatin,
              lastNameLatin,
              gender,
              familyStatus,
              nationality,
              NIN,
              new Date(dateOfExpiration).toISOString().split("T")[0],
              new Date(dateOfBirth).toISOString().split("T")[0],
              birthCountry,
              addresses[birthWillaya - 1].nameAr +
                " " +
                "-" +
                " " +
                addresses[birthWillaya - 1].nameFr,
              birthCommune,
              birthAddress,
              addresses[residenceWillaya - 1].nameAr +
                " " +
                "-" +
                " " +
                addresses[residenceWillaya - 1].nameFr,
              residenceCommune,
              residenceAddress,
              email,
              phoneNumber1,
              phoneNumber2,
              medicalCondition,
              baccalaureateSeries,
              baccalaureateYear,
              baccalaureateMajor,
              baccalaureateAverage,
              mathematicsMark,
              physicsMark,
              highSchoolName,
              highSchoolType,
              currentUniversity,
              currentUniversityYear,
              currentUniversityMajor,
              fatherFirstName,
              fatherOccupation,
              fatherEmail,
              fatherPhoneNumber,
              motherFirstName,
              motherLastName,
              motherOccupation,
              guardianFullName,
              guardianRelationship,
              guardianPhoneNumber,
              guardianEmail,
              null,
              majorName(majors[0]),
              majorName(majors[1]),
              language,
            ],
          ],
        },
      });
    }
    if (type === "reRegistration" && degree === "license") {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet6!A:D",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [
            [
              "License - ليسانس",
              "Re-Registration - إعادة تسجيل",
              firstName,
              lastName,
              firstNameLatin,
              lastNameLatin,
              gender,
              familyStatus,
              nationality,
              NIN,
              new Date(dateOfExpiration).toISOString().split("T")[0],
              new Date(dateOfBirth).toISOString().split("T")[0],
              birthCountry,
              addresses[birthWillaya - 1].nameAr +
                " " +
                "-" +
                " " +
                addresses[birthWillaya - 1].nameFr,
              birthCommune,
              birthAddress,
              addresses[residenceWillaya - 1].nameAr +
                " " +
                "-" +
                " " +
                addresses[residenceWillaya - 1].nameFr,
              residenceCommune,
              residenceAddress,
              email,
              phoneNumber1,
              phoneNumber2,
              medicalCondition,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              majorName(majors[0]),
              null,
              language,
            ],
          ],
        },
      });
    }
    if (type === "newRegistration" && degree === "master") {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet6!A:D",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [
            [
              "master - ماستر",
              "New-Registration - تسجيل جديد",
              firstName,
              lastName,
              firstNameLatin,
              lastNameLatin,
              gender,
              familyStatus,
              nationality,
              NIN,
              new Date(dateOfExpiration).toISOString().split("T")[0],
              new Date(dateOfBirth).toISOString().split("T")[0],
              birthCountry,
              addresses[birthWillaya - 1].nameAr +
                " " +
                "-" +
                " " +
                addresses[birthWillaya - 1].nameFr,
              birthCommune,
              birthAddress,
              addresses[residenceWillaya - 1].nameAr +
                " " +
                "-" +
                " " +
                addresses[residenceWillaya - 1].nameFr,
              residenceCommune,
              residenceAddress,
              email,
              phoneNumber1,
              phoneNumber2,
              medicalCondition,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              currentUniversity,
              currentUniversityYear,
              currentUniversityMajor,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              guardianFullName,
              guardianRelationship,
              guardianEmail,
              guardianPhoneNumber,
              guardianAddress,
              majorName(majors[0]),
              majorName(majors[1]),
              language,
            ],
          ],
        },
      });
    }
    if (type === "reRegistration" && degree === "master") {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet6!A:D",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [
            [
              "master - ماستر",
              "Re-Registration - إعادة تسجيل",
              firstName,
              lastName,
              firstNameLatin,
              lastNameLatin,
              gender,
              familyStatus,
              nationality,
              NIN,
              new Date(dateOfExpiration).toISOString().split("T")[0],
              new Date(dateOfBirth).toISOString().split("T")[0],
              birthCountry,
              addresses[birthWillaya - 1].nameAr +
                " " +
                "-" +
                " " +
                addresses[birthWillaya - 1].nameFr,
              birthCommune,
              birthAddress,
              addresses[residenceWillaya - 1].nameAr +
                " " +
                "-" +
                " " +
                addresses[residenceWillaya - 1].nameFr,
              residenceCommune,
              residenceAddress,
              email,
              phoneNumber1,
              phoneNumber2,
              medicalCondition,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              majorName(majors[0]),
              null,
              language,
            ],
          ],
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Data added to Google Sheet",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
