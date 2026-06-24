import bidiFactory from "bidi-js";

// Arabic handling. We draw values with page.drawText (not form fields):
// pdf-lib's drawText runs fontkit's OpenType shaper, so it joins Arabic
// letters into their correct contextual forms automatically. We pass the
// ORIGINAL base letters (no presentation-form conversion, which produced
// "tofu" squares because the font lacks those legacy codepoints).
//
// fontkit shapes a SINGLE run in one direction; it does not do full bidi for
// a mixed Latin/Arabic string in one layout() call (the Arabic ends up
// unshaped, or the Latin reversed). So we split the value into directional
// runs in VISUAL order using bidi-js, keep each run in its own logical order
// (so the shaper joins it correctly), and the caller draws each run in
// sequence. A pure-Arabic word is just one RTL run, which fixes the
// "محمد => دمحم" reversal caused by double-reordering.
const bidi = bidiFactory();

export const hasArabic = (s) =>
  /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/.test(String(s));

export const splitRuns = (text) => {
  const str = String(text ?? "");
  if (str === "") return [];
  if (!hasArabic(str)) return [{ text: str, rtl: false }];
  const el = bidi.getEmbeddingLevels(str);
  const levels = el.levels;
  const order = bidi.getReorderedIndices(str, el); // source indices, visual order
  const runs = [];
  let cur = null;
  for (const idx of order) {
    const lvl = levels[idx];
    const contiguous =
      cur &&
      cur.level === lvl &&
      (lvl % 2 === 0 ? idx === cur.end + 1 : idx === cur.start - 1);
    if (contiguous) {
      if (lvl % 2 === 0) cur.end = idx;
      else cur.start = idx;
    } else {
      cur = { level: lvl, start: idx, end: idx };
      runs.push(cur);
    }
  }
  // Each run's text is taken in logical order so fontkit shapes it correctly.
  return runs.map((r) => ({
    text: str.slice(r.start, r.end + 1),
    rtl: r.level % 2 === 1,
  }));
};
