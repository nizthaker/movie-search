export const formatDate = (isoDate: string): string => {
  if (!isoDate) return 'N/A';

  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};
