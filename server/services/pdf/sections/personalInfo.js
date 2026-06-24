import addresses from "../../../data/addresses.json" with { type: "json" };

// Format a date value as "YYYY-MM-DD", returning "" for empty/invalid input so
// optional dates (e.g. dateOfExpiration) don't throw "Invalid time value".
const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
};

// Build a "<wilayaFr>, <communeFr> - <wilayaAr>, <communeAr>" place string from
// a 1-based wilaya code and a submitted "<nameFr> <nameAr>" commune string,
// e.g. "Alger, Mohamadia - الجزائر, المحمدية".
const formatPlace = (wilayaCode, communeRaw) => {
  const wilaya = addresses[wilayaCode - 1];
  const wilayaFr = wilaya?.nameFr ?? "";
  const wilayaAr = wilaya?.nameAr ?? "";
  // Split the commune string at its first Arabic character so a multi-word
  // French name (e.g. "Ouled Ahmed Timmi") stays intact.
  const communeStr = String(communeRaw ?? "");
  const arIndex = communeStr.search(/[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/);
  const communeFr =
    arIndex === -1 ? communeStr.trim() : communeStr.slice(0, arIndex).trim();
  const communeAr = arIndex === -1 ? "" : communeStr.slice(arIndex).trim();
  return `${wilayaFr}, ${communeFr} - ${wilayaAr}, ${communeAr}`;
};

// Fill the Personal Information section: identity, place/date of birth,
// residence, gender/family-status/title checkboxes, contact details, and
// medical condition.
export const fillPersonalInfo = (data, { drawInField, checkBox }) => {
  const {
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
  } = data;

  drawInField("firstName", firstName);
  drawInField("lastName", lastName);
  drawInField("firstNameLatin", firstNameLatin);
  drawInField("lastNameLatin", lastNameLatin);
  drawInField("nationality", nationality);
  drawInField("NIN", NIN);
  drawInField("dateOfExpiration", formatDate(dateOfExpiration));

  if (birthCountry === "Algeria - الجزائر") {
    drawInField("placeOfBirth", formatPlace(birthWillaya, birthCommune));
  } else {
    drawInField("placeOfBirth", birthAddress);
  }

  // Split the date of birth (YYYY-MM-DD) into per-digit fields. Day and
  // month each go into two single-digit boxes; the year stays whole.
  // e.g. 2010-12-12 -> birthYear=2010, birthM1=1 birthM2=2, birthD1=1 birthD2=2
  const dob = new Date(dateOfBirth).toISOString().split("T")[0];
  const [birthYear, birthMonth, birthDay] = dob.split("-");
  drawInField("birthYear", birthYear);
  drawInField("birthM1", birthMonth?.[0]);
  drawInField("birthM2", birthMonth?.[1]);
  drawInField("birthD1", birthDay?.[0]);
  drawInField("birthD2", birthDay?.[1]);

  drawInField("residenceCountry", "Algeria - الجزائر");
  drawInField(
    "residenceWillaya",
    formatPlace(residenceWillaya, residenceCommune),
  );

  // gender / familyStatus are checkboxes (one box per option), ticked
  // based on the submitted value.
  const isMale = gender === "male - ذكر";
  const isFemale = gender === "female - أنثى";
  const isMarried = familyStatus === "married - متزوج";
  const isSingle = familyStatus === "single - أعزب";

  if (isMarried) checkBox("isMarried");
  if (isSingle) checkBox("isSingle");
  if (isMale) checkBox("isMale");
  if (isFemale) checkBox("isFemale");

  // Title: Mr for males; for females, Mrs when married else Ms.
  if (isMale) checkBox("isMr");
  else if (isFemale) checkBox(isMarried ? "isMrs" : "isMs");

  drawInField("residenceAddress", residenceAddress);
  drawInField("email", email);
  drawInField("phoneNumber1", phoneNumber1);
  drawInField("phoneNumber2", phoneNumber2);

  if (medicalCondition === "Good Health - صحة جيدة") {
    checkBox("isGoodHealth");
  } else {
    checkBox("isNotGoodHealth");
    drawInField("medicalCondition", medicalCondition);
  }
};
