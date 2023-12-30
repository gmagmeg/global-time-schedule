import { TimeZoneInfo } from "@/app/_day-schedule/hooks/day-schedule-state";
import { DateTimeString, toDateTimeString } from "@/library/type-date";
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
