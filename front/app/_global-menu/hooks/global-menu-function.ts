import { DateString } from "../type-global-menu";
import { customDayjs } from "@lib/dayjs";

// 月～土曜日の日付を日曜日に補正する
export const correctToSunday = (date: DateString): DateString => {
  const now = customDayjs(date);
  const nextSunday = now.day(7);
  return nextSunday.format("YYYY-MM-DD");
};