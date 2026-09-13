export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
}
