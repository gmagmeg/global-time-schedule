import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localDate from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { DayScheduleState } from "@/app/_day-schedule/hooks/day-schedule-state";
import { TimeZone, DateString } from "./type-date";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localDate);
dayjs.extend(weekday);

export const customDayjs = dayjs;
export const _timezone = dayjs;
export type CustomDayjs = Dayjs;

/**
 * 選択された時間をタイムゾーンに応じた時間に変換する
 * @param selectedTime
 * @param timeZone
 * @returns
 */
export const toTimeZoneTime = (
  baseDate: DateString,
  selectedTime: DayScheduleState["selectedTime"],
  baseTimeZone: TimeZone,
  convertTimeZone: TimeZone
): string => {
  const { hour, minute } = selectedTime;

  const baseYmd = dayjs(baseDate).format("YYYY-MM-DD");
  const timeInBaseTimezone = dayjs.tz(
    `${baseYmd}T${hour}:${minute}:00`,
    baseTimeZone
  );

  return timeInBaseTimezone.tz(convertTimeZone).format("HH:mm A");
};

/**
 * 開始日を基準に、1週間の日付を作成する
 * @param baseDate
 * @returns
 */
export const createWeekRange = (baseDate: DateString): DateString[] => {
  const startDate = customDayjs(baseDate);
  const weekRange = [];
  for (let i = 0; i <= 6; i++) {
    weekRange.push(startDate.add(i, "day").format("YYYY-MM-DD"));
  }

  return weekRange;
};
