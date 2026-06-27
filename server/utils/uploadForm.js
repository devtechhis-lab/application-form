import { supabase } from "../lib/supabaseClient.js";

const BUCKET = "forms";

// Upload a generated PDF (raw bytes) to Supabase Storage and return its public
// URL. Called from the controller after the form PDF is generated.
//
// `bytes`    - Uint8Array returned by generateLicensePdf()
// `fileName` - a base name for the file, e.g. "ahmed-benali". A timestamp is
//              prepended so concurrent submissions never overwrite each other.
export const uploadForm = async (bytes, fileName) => {
  const objectPath = `public/${Date.now()}-${fileName}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(objectPath, bytes, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadError) {
    // Surface the failure so the controller can decide how to respond instead
    // of silently swallowing it.
    throw new Error(`Supabase upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);

  if (!data?.publicUrl) {
    throw new Error(
      "Supabase upload succeeded but no public URL was returned.",
    );
  }

  return data.publicUrl;
};
