import type { Tense, Unit } from "../utils/formatDate";

export type Option = {
  label: string;
  value: string | RelValue;
};

export type RelValue = `${Tense}:${Unit}`;

export const TENSE_OPTIONS: Option[] = [
  { label: "Last", value: "last" },
  { label: "Next", value: "next" },
];

export const UNIT_OPTIONS: Option[] = [
  { label: "Seconds", value: "s" },
  { label: "Minutes", value: "m" },
  { label: "Hours", value: "h" },
  { label: "Days", value: "d" },
  { label: "Weeks", value: "w" },
  { label: "Months", value: "M" },
  { label: "Years", value: "y" },
];

export type RangePreset = { label: string; id: string };

export const RANGE_PRESETS: RangePreset[] = [
  { label: "Today", id: "today" },
  { label: "Yesterday", id: "yesterday" },
  { label: "This week", id: "this_week" },
  { label: "Week to date", id: "wtd" },
  { label: "This month", id: "this_month" },
  { label: "Month to date", id: "mtd" },
  { label: "This year", id: "this_year" },
  { label: "Year to date", id: "ytd" },
];

export const RELATIVE_UNIT_OPTIONS: { label: string; value: RelValue }[] = [
  { label: "Seconds ago", value: "last:s" },
  { label: "Minutes ago", value: "last:m" },
  { label: "Hours ago", value: "last:h" },
  { label: "Days ago", value: "last:d" },
  { label: "Weeks ago", value: "last:w" },
  { label: "Months ago", value: "last:M" },
  { label: "Years ago", value: "last:y" },
  { label: "Seconds from now", value: "next:s" },
  { label: "Minutes from now", value: "next:m" },
  { label: "Hours from now", value: "next:h" },
  { label: "Days from now", value: "next:d" },
  { label: "Weeks from now", value: "next:w" },
  { label: "Months from now", value: "next:M" },
  { label: "Years from now", value: "next:y" },
];
