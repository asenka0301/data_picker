import type { Duration } from "date-fns/fp";

export type Unit = "s" | "m" | "h" | "d" | "w" | "M" | "y";

export const formatDate = (d: Date) => {
  const datePart = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);

  const pad2 = (n: number) => String(n).padStart(2, "0");
  const pad3 = (n: number) => String(n).padStart(3, "0");

  const timePart = `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(
    d.getSeconds()
  )}.${pad3(d.getMilliseconds())}`;

  return `${datePart} @ ${timePart}`;
};

export const toDuration = (n: number, u: Unit): Duration => {
  switch (u) {
    case "s":
      return { seconds: n };
    case "m":
      return { minutes: n };
    case "h":
      return { hours: n };
    case "d":
      return { days: n };
    case "w":
      return { weeks: n };
    case "M":
      return { months: n };
    case "y":
      return { years: n };
  }
};
