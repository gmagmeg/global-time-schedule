/**
 * @module _day-schedule
 */

/**
 * 型変換の関数は型と一緒に使うことが多いので、
 * このファイルに定義する
 */

import { DateString, TimeZone } from "@/library/type-date";
import { customDayjs } from "@lib/dayjs";
import { HourOrMinutes, TimeType, TimeZoneTime } from "../type-day-schedule";

export type DayScheduleState = {
  /**
   * 開始日を表す日付文字列
   */
  startDate: DateString;
  /**
   * 選択された時間を表すオブジェクト
   * - hour: 選択された時間（時）
   * - minute: 選択された時間（分）
   * - timeType: 時間の種類（例: AM/PM）
   */
  selectedTime: {
    hour: HourOrMinutes;
    minute: HourOrMinutes;
    timeType: TimeType;
  };
  /**
   * タイムゾーンに関する情報を含む配列
   * - timeZone: タイムゾーンを表す文字列
   * - timeZoneTime: タイムゾーンに応じた時間
   */
  timeZones: {
    timeZone: TimeZone;
    timeZoneTime: TimeZoneTime;
  }[];
};

export const dayScheduleState: DayScheduleState = {
  startDate: customDayjs().format("YYYY-MM-DD 00:00"),
  selectedTime: {
    hour: 0,
    minute: 30,
    timeType: "AM",
  },
  timeZones: [
    {
      timeZone: "Asia/Tokyo",
      timeZoneTime: "09-01 AM",
    },
    {
      timeZone: "America/New_York",
      timeZoneTime: "09-01 AM",
    },
    {
      timeZone: "Europe/Paris",
      timeZoneTime: "09-01 AM",
    },
  ],
};
