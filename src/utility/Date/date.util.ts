export function getCurrentDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toTimeString().split(' ')[0]; // "HH:MM:SS"
}

export function getDaysBetween(fromDate: string | Date, toDate: string | Date): number {
  const start = new Date(fromDate);
  const end = new Date(toDate);

  const diffMs = end.getTime() - start.getTime();

  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}
