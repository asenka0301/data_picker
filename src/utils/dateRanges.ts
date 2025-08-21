import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  endOfYear,
  endOfYesterday,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  startOfYesterday,
} from "date-fns";

type Range = { start: Date; end: Date };

export const getRange = (id: string, now = new Date()): Range => {
  switch (id) {
    case "today":
      return { start: startOfToday(), end: endOfToday() };
    case "yesterday":
      return { start: startOfYesterday(), end: endOfYesterday() };
    case "this_week":
      return {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case "wtd":
      return { start: startOfWeek(now, { weekStartsOn: 1 }), end: now };
    case "this_month":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "mtd":
      return { start: startOfMonth(now), end: now };
    case "this_year":
      return { start: startOfYear(now), end: endOfYear(now) };
    case "ytd":
      return { start: startOfYear(now), end: now };
    default:
      throw new Error(`Unknown preset id: ${id}`);
  }
};
