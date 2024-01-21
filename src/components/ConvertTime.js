export const getLocaleTime = (utcTimeString) => {
  const utcDate = new Date(utcTimeString);

  const localTimeString = utcDate.toLocaleString();
  return localTimeString;
};
