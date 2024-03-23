export const getThisYearStartToEnd = () => {
  const currentYear = new Date().getFullYear();

  const startOfYear = new Date(`${currentYear}-01-01`);
  const formattedStartOfYear = startOfYear.toISOString().slice(0, 10);
  const endOfYear = new Date(`${currentYear}-12-31`);
  const formattedEndOfYear = endOfYear.toISOString().slice(0, 10);
  return {
    start: formattedStartOfYear,
    end: formattedEndOfYear,
  };
};
