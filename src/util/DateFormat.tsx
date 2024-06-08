export function formatDate(date: any) {
  const options = {
    weekday: "long" as const,
    month: "long" as const,
    day: "numeric" as const,
    year: "numeric" as const,
  };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
}
