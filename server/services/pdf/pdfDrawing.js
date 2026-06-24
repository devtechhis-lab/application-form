import { splitRuns } from "./arabicText.js";

const PAD_X = 2;

// Build the two drawing primitives (drawInField, checkBox) bound to a single
// loaded document context. Both draw with page.drawText so fontkit's shaper
// joins Arabic correctly and the marks survive form.flatten().
export const createDrawers = ({ form, pages, arabicFont, metrics }) => {
  const { ascent, descent, lineHeightPerPt } = metrics;

  // Draw a value directly into a form field's box using page.drawText, which
  // runs fontkit's shaper (so Arabic letters join correctly). The form field
  // itself is removed afterwards (form.flatten) so its empty box doesn't
  // overlay the drawn text.
  const drawInField = (fieldName, rawValue) => {
    if (rawValue == null || String(rawValue).trim() === "") return;
    let field;
    try {
      field = form.getTextField(fieldName);
    } catch {
      return; // field not present in this PDF
    }
    const widget = field.acroField.getWidgets()[0];
    if (!widget) return;
    const { x, y, width, height } = widget.getRectangle();

    // Find the page this widget lives on.
    const widgetPageRef = widget.P();
    const page = pages.find((p) => p.ref === widgetPageRef) ?? pages[0];

    // Split into directional runs (visual order). Each run is drawn with
    // its own drawText so fontkit shapes it correctly in its own direction.
    const runs = splitRuns(rawValue);
    if (runs.length === 0) return;

    // Total width of the line at a given size = sum of run widths.
    const lineWidth = (size) =>
      runs.reduce(
        (sum, r) => sum + arabicFont.widthOfTextAtSize(r.text, size),
        0,
      );

    // Largest size whose line height fits the box (8% padding), capped at
    // 10pt, then shrunk further if the line is wider than the box.
    let size = Math.max(
      6,
      Math.min(10, Math.floor(((height * 0.92) / lineHeightPerPt) * 2) / 2),
    );
    const maxWidth = width - PAD_X * 2;
    while (size > 5 && lineWidth(size) > maxWidth) {
      size -= 0.5;
    }

    // Vertically center the line within the box.
    const textY =
      y + (height - (ascent - descent) * size) / 2 - descent * size;

    // The overall line is RTL when the value starts with a strong Arabic
    // character; right-align it then, left-align otherwise.
    const total = lineWidth(size);
    const startRtl = !!String(rawValue)
      .trimStart()
      .match(/^[؀-ۿ]/);
    let cursorX = startRtl ? x + width - PAD_X - total : x + PAD_X;

    // Runs are already in visual (left-to-right) order; draw them in turn.
    for (const r of runs) {
      page.drawText(r.text, {
        x: cursorX,
        y: textY,
        size,
        font: arabicFont,
      });
      cursorX += arabicFont.widthOfTextAtSize(r.text, size);
    }
  };

  // Tick a checkbox field by name. We don't rely on field.check() +
  // form.flatten(): this PDF's checkbox "on" appearance draws its tick with
  // a dingbat font whose BBox is in absolute page coordinates, which
  // flatten() mis-transforms (the tick lands off-box). Instead we draw an
  // "X" directly into the widget's rectangle, the same way drawInField
  // draws text — so it survives flatten() and is always visible.
  const checkBox = (fieldName) => {
    let field;
    try {
      field = form.getCheckBox(fieldName);
    } catch {
      return; // field not present in this PDF
    }
    const widget = field.acroField.getWidgets()[0];
    if (!widget) return;
    const { x, y, width, height } = widget.getRectangle();
    const widgetPageRef = widget.P();
    const page = pages.find((p) => p.ref === widgetPageRef) ?? pages[0];

    // Fit an "X" inside the box (with a little padding) and center it.
    const size = Math.max(6, Math.min(height, width) * 0.9);
    const mark = "X";
    const markWidth = arabicFont.widthOfTextAtSize(mark, size);
    const textX = x + (width - markWidth) / 2;
    const textY =
      y + (height - (ascent - descent) * size) / 2 - descent * size;
    page.drawText(mark, { x: textX, y: textY, size, font: arabicFont });
  };

  return { drawInField, checkBox };
};
