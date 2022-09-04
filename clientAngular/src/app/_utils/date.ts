const addZeroToDateFormat = (dateNumber: number): string =>
  dateNumber < 10 ? '0' + dateNumber : String(dateNumber);

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return {
    year: addZeroToDateFormat(year),
    month: addZeroToDateFormat(month),
    day: addZeroToDateFormat(day),
    hours: addZeroToDateFormat(hours),
    minutes: addZeroToDateFormat(minutes),
    seconds: addZeroToDateFormat(seconds),
  };
};

export const formatActivityDate = (date: Date) => {
  const { year, month, day, hours, minutes } = formatDate(date);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
