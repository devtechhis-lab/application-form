// Fill the Academic Background section: high school, baccalaureate, and the
// applicant's current university studies.
export const fillAcademicInfo = (data, { drawInField }) => {
  const {
    degree,
    baccalaureateSeries,
    baccalaureateYear,
    baccalaureateAverage,
    baccalaureateMajor,
    highSchoolName,
    highSchoolType,
    currentUniversity,
    currentUniversityYear,
    currentUniversityMajor,
    licenseYear,
    licenseMajor,
    licenseUniversity,
  } = data;

  if (degree === "license") {
    drawInField("hsName", highSchoolName);
    if (baccalaureateMajor === "EQUIVALENCE - شهادة معادلة") {
      drawInField("bac", "EQUIVALENCE - شهادة معادلة");
    } else {
      drawInField("bac", "Baccalaureate - شهادة البكالوريا");
    }
    drawInField("bacYear", baccalaureateYear);
    drawInField("bacResult", baccalaureateAverage);
    drawInField("hsType", highSchoolType);
    drawInField("bacSeries", baccalaureateSeries);
  } else {
    drawInField("licenseYear", licenseYear);
    drawInField("licenseMajor", licenseMajor);
    drawInField("licenseUnive", licenseUniversity);
  }

  drawInField("currentUniv", currentUniversity);
  drawInField("currentMajor", currentUniversityMajor);
  drawInField("currentYear", currentUniversityYear);
};
