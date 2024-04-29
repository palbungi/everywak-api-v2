export function generateDateHourString(date: Date) {
  const year = date.getFullYear() % 100;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  return parseInt(`${year * 1000000 + month * 10000 + day * 100 + hour}`);
}