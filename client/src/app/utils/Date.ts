export const getDate = (date: Date) => {
  const day = addZeroToNumberBelow10(date.getDate());
  const month = addZeroToNumberBelow10(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = addZeroToNumberBelow10(date.getHours());
  const minutes = addZeroToNumberBelow10(date.getMinutes());
  const seconds = addZeroToNumberBelow10(date.getSeconds());

  return { year, month, day, hours, minutes, seconds };
};

const addZeroToNumberBelow10 = (date: number): string => {
  return date < 10 ? "0" + date : String(date);
};
