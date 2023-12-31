import { TimeZoneInfo } from "@/app/_day-schedule/hooks/day-schedule-state";
import { customDayjs } from "@/library/dayjs";
import {
  DateString,
  DateTimeString,
  toDateString,
  toDateTimeString,
} from "@/library/type-date";
import dayjs from "dayjs";

/**
 * 基準日をタイムゾーンに応じた時間に変換する
 */
export const convertTimeZoneTime = (
  baseDateTime: DateTimeString,
  fromTimezone: TimeZoneInfo,
  toTimezone: TimeZoneInfo
): DateTimeString => {
  // UTC文字列から数値を取得する
  const convertUTCNum = (utcString: string): number => {
    const utcNum = Number(utcString.replace("UTC", "").replace(/:\d{2}/, ""));
    return utcNum;
  };

  const fromUTCNum = convertUTCNum(fromTimezone.utc);
  const toUTCNum = convertUTCNum(toTimezone.utc);
  const currentHour = dayjs(baseDateTime).hour();
  const correctHour = currentHour + (fromUTCNum - toUTCNum);

  const result =
    correctHour <= 0
      ? dayjs(baseDateTime).add(correctHour, "hour").format("hh:mm A")
      : dayjs(baseDateTime).subtract(correctHour, "hour").format("hh:mm A");

  return toDateTimeString(result);
};

/**
 * スケジュールの設定開始日を日曜日にするために、
 * 何曜日始まりであっても、翌週の日曜日に補正する
 */
export const moveToNextSunday = (date?: string): DateString => {
  const now = customDayjs(date) ?? customDayjs();
  const nextSunday = now.day(7);

  return toDateString(nextSunday.format("YYYY-MM-DD"));
};
