// Serialize a Date as a local "YYYY-MM-DD" string.
//
// The calendar picker stores a Date at LOCAL midnight (e.g. 2026-06-23T00:00
// in UTC+1). JSON.stringify would call Date.toISOString(), converting to UTC
// and shifting the day back by one (2026-06-22T23:00Z -> "2026-06-22"). Reading
// the LOCAL date parts instead keeps the day the user actually picked.
export const toLocalDateString = (value: unknown): unknown => {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return value;
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Return a shallow copy of the form payload with all Date-valued date fields
// converted to local "YYYY-MM-DD" strings, so JSON serialization never shifts
// the day across timezones.
const DATE_FIELDS = ["dateOfBirth", "dateOfExpiration"] as const;

export const normalizeFormDates = <T extends Record<string, any>>(data: T): T => {
  const result: Record<string, any> = { ...data };
  for (const field of DATE_FIELDS) {
    if (field in result) result[field] = toLocalDateString(result[field]);
  }
  return result as T;
};
