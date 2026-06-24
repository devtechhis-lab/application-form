import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve assets relative to the server root (two levels up from
// services/pdf/) so this works regardless of the process working directory.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_ROOT = path.resolve(__dirname, "..", "..");
const FORM_TEMPLATE_PATH = path.join(SERVER_ROOT, "form.pdf");
const FORM_RESIDENT_PATH = path.join(SERVER_ROOT, "formR.pdf");
const FORM_NON_RESIDENT_PATH = path.join(SERVER_ROOT, "formNR.pdf");
const ARABIC_FONT_PATH = path.join(SERVER_ROOT, "fonts", "Cairo.ttf");

// Load the blank form template, embed a Unicode (Arabic-capable) font, and
// return everything callers need to fill it. The default standard fonts only
// support WinAnsi (Latin-1) and throw on characters like "ج", so we embed
// Cairo and draw all text with it.
export const loadFormDocument = async (nationality) => {
  let pdfBytes;
  if (nationality === "Algeria - الجزائر") {
    pdfBytes = fs.readFileSync(FORM_RESIDENT_PATH);
  } else {
    pdfBytes = fs.readFileSync(FORM_NON_RESIDENT_PATH);
  }

  const pdfDoc = await PDFDocument.load(pdfBytes);
  // fontkit must be registered on the PDFDocument before embedding a
  // custom (non-standard) font.
  pdfDoc.registerFontkit(fontkit);

  const arabicFontBytes = fs.readFileSync(ARABIC_FONT_PATH);
  const arabicFont = await pdfDoc.embedFont(arabicFontBytes, {
    subset: true,
  });

  const form = pdfDoc.getForm();
  const pages = pdfDoc.getPages();

  // Font metrics (in font units) used for vertical centering and fit size.
  const fkFont = arabicFont.embedder.font;
  const unitsPerEm = fkFont.unitsPerEm;
  const ascent = fkFont.ascent / unitsPerEm;
  const descent = fkFont.descent / unitsPerEm; // negative
  const lineHeightPerPt = ascent - descent + (fkFont.lineGap || 0) / unitsPerEm;

  return {
    pdfDoc,
    form,
    pages,
    arabicFont,
    metrics: { unitsPerEm, ascent, descent, lineHeightPerPt },
  };
};
