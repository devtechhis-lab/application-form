import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadFormDocument } from "./pdfDocument.js";
import { createDrawers } from "./pdfDrawing.js";
import { fillPersonalInfo } from "./sections/personalInfo.js";
import { fillParentsInfo } from "./sections/parentsInfo.js";
import { fillAcademicInfo } from "./sections/academicInfo.js";
import { fillMajors } from "./sections/majors.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_ROOT = path.resolve(__dirname, "..", "..");
const OUTPUT_PATH = path.join(SERVER_ROOT, "filled.pdf");

// Generate a filled new-license registration PDF from validated form data.
// Loads the template, fills each information section in order, flattens the
// interactive fields, writes the result to server/filled.pdf, and returns the
// saved bytes.
export const generateLicensePdf = async (data) => {
  const context = await loadFormDocument(data.nationality);
  const drawers = createDrawers(context);

  fillPersonalInfo(data, drawers);
  // fillParentsInfo(data, drawers);
  // fillAcademicInfo(data, drawers);
  fillMajors(data, drawers);

  // Remove the now-empty interactive fields so their boxes don't sit on top
  // of the text we drew.
  context.form.flatten();

  const bytes = await context.pdfDoc.save();
  fs.writeFileSync(OUTPUT_PATH, bytes);
  return bytes;
};
