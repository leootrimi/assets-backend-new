export function getCurrentDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toTimeString().split(' ')[0]; // "HH:MM:SS"
}
