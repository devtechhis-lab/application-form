import { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef } from "pdf-lib";
import fs from "fs";

const bytes = fs.readFileSync("form.pdf");
const doc = await PDFDocument.load(bytes);

const catalog = doc.catalog;
const acroForm = catalog.lookup(PDFName.of("AcroForm"), PDFDict);
console.log("AcroForm present:", !!acroForm);

if (acroForm) {
  const fields = acroForm.lookup(PDFName.of("Fields"), PDFArray);
  console.log("Fields array present:", !!fields);
  if (fields) {
    console.log("Field count:", fields.size());
    for (let i = 0; i < fields.size(); i++) {
      const ref = fields.get(i);
      let info = `#${i}: ref=${ref}`;
      try {
        const dict = fields.lookup(i, PDFDict);
        if (!dict) {
          info += "  -> lookup returned UNDEFINED (dangling ref!)";
        } else {
          const T = dict.lookup(PDFName.of("T"));
          const FT = dict.lookup(PDFName.of("FT"));
          info += `  T=${T} FT=${FT}`;
        }
      } catch (e) {
        info += `  -> ERROR: ${e.message}`;
      }
      console.log(info);
    }
  }
}
