import dayjs from "dayjs";

export function getCurrentDate() {
  return dayjs().format("YYYY-MM-DD");
}

export function formatDate(date, format) {
  return dayjs(date).format(format);
}
