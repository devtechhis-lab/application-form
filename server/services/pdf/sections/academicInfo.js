// Fill the Academic Background section: high school, baccalaureate, and the
// applicant's current university studies.
export const fillAcademicInfo = (data, { drawInField }) => {
  const {
    baccalaureateSeries,
    baccalaureateYear,
    baccalaureateAverage,
    highSchoolName,
    highSchoolType,
    currentUniversity,
    currentUniversityYear,
    currentUniversityMajor,
  } = data;

  drawInField("hsName", highSchoolName);
  drawInField("bac", "Baccalaureate - شهادة البكالوريا");
  drawInField("bacYear", baccalaureateYear);
  drawInField("bacResult", baccalaureateAverage);
  drawInField("hsType", highSchoolType);
  drawInField("bacSerie", baccalaureateSeries);
  drawInField("currentUniv", currentUniversity);
  drawInField("currentMajor", currentUniversityMajor);
  drawInField("currentYear", currentUniversityYear);
};
