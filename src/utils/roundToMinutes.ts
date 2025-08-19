export const roundToMinutes = (date: Date, step = 30) => {
  const ms = step * 60 * 1000;
  const t = Math.round(date.getTime() / ms) * ms;
  const d = new Date(t);
  d.setSeconds(0, 0);
  return d;
};
