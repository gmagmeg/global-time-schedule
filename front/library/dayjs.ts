import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localDate from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { DateString, toDateString } from "./type-date";

dayjs.extend(utc);
// dayjs.extend(timezone);
dayjs.extend(localDate);
dayjs.extend(weekday);

export const customDayjs = dayjs;
export const _timezone = dayjs;
export type CustomDayjs = Dayjs;

/**
 * 開始日を基準に、1週間の日付を作成する
 */
export const createWeekRange = (baseDate: DateString): DateString[] => {
  const startDate = customDayjs(baseDate);
  const weekRange: DateString[] = [];
  let dateString: DateString;
  for (let i = 0; i <= 6; i++) {
    dateString = toDateString(startDate.add(i, "day").format("YYYY-MM-DD"));
    weekRange.push(dateString);
  }

  return weekRange;
};

// 月～土曜日の日付を日曜日に補正する
export const correctToSunday = (date: DateString): DateString => {
  const now = customDayjs(date);
  const nextSunday = now.day(7);
  return toDateString(nextSunday.format("YYYY-MM-DD"));
};
