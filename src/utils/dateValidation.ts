export type ValidationResult =
  | { ok: true; date: Date }
  | { ok: false; message: string };

export const ALLOWED_FORMATS_MSG =
  "Allowed format: MMM D, YYYY @ HH:mm:ss.SSS.";

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function validateFormat(s: string): Date | null {
  const m = s.match(
    /^\s*([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})\s+@\s+(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*$/
  );
  if (!m) return null;

  const month = MONTHS[m[1].toLowerCase()];
  if (month == null) return null;

  const day = +m[2],
    year = +m[3],
    hh = +m[4],
    mm = +m[5],
    ss = +m[6],
    ms = +m[7];
  if (year < 100 || hh > 23 || mm > 59 || ss > 59 || ms > 999 || day < 1)
    return null;

  const dim = new Date(year, month + 1, 0).getDate();
  if (day > dim) return null;

  const d = new Date(year, month, day, hh, mm, ss, ms);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function parseToDate(input: string): Date | null {
  const v = input.trim();
  if (!v) return null;

  return validateFormat(v);
}

export function validateDate(input: string): ValidationResult {
  const d = parseToDate(input);
  if (!d) {
    return { ok: false, message: ALLOWED_FORMATS_MSG };
  }
  return { ok: true, date: d };
}
