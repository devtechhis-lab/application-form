// A couple of major ids differ from their PDF field name; remap those.
const majorFieldName = {
  cp: "cp",
  lpl: "lpl",
  cs: "cs",
  cse: "cse",
  scs: "scs",
  ste: "ste",
  ebm: "ebm",
};

// Fill the Choosing Majors section: the study language checkbox and the
// ranked list of major preferences.
export const fillMajors = (data, { drawInField, checkBox }) => {
  const { majors, language } = data;

  language === "arabic - العربية" && checkBox("isArabic");
  language === "english - إنجليزية" && checkBox("isEnglish");
  language === "french - فرنسية" && checkBox("isFrench");

  // Majors are an ordered preference list (most preferred first). Write each
  // major's 1-based rank into the PDF text field named after it, e.g.
  // majors = ["cs", "scs"] -> field "cs" = 1, field "scs" = 2.
  if (data.type === "newRegistration") {
    majors.forEach((id, index) => {
      if (id == null) return;
      drawInField(majorFieldName[id] ?? id, String(index + 1));
    });
  } else {
    drawInField(majors[0], "X");
  }
};
