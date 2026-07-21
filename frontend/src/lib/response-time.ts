export function responseMinutes(label: string): number {
  const match = label.match(/([\d.]+)\s*(min|hr)/i);
  if (!match) return 999;
  const value = parseFloat(match[1]);
  return match[2].toLowerCase() === "hr" ? value * 60 : value;
}
