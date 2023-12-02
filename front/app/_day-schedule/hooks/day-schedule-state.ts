/**
 * @module _day-schedule
 */

/**
 * 型変換の関数は型と一緒に使うことが多いので、
 * このファイルに定義する
 */

import { DateString, TimeZone } from "@/library/type-date";
import { customDayjs } from "@lib/dayjs";
import { HourOrMinutes, TimeType } from "../type-day-schedule";
import { hour12, minutes } from "../_day-schedule-function";

export type DayScheduleState = {
  /**
   * 開始日を表す日付文字列
   */
  startDate: DateString;
  /**
   * 時間と分の選択肢を表すオブジェクト
   */
  timeSelectOption: {
    hour: HourOrMinutes[];
    minute: HourOrMinutes[];
  };
  /**
   * 選択された時間を表すオブジェクト
   * - hour: 選択された時間（時）
   * - minute: 選択された時間（分）
   * - timeType: 時間の種類（例: AM/PM）
   */
  selectedTime: {
    hour: HourOrMinutes;
    minute: HourOrMinutes;
    type: TimeType;
  };
  /**
   * タイムゾーンに関する情報を含む配列
   * - from: タイムゾーンを表す文字列
   * - to: タイムゾーンに応じた時間
   */
  timeZone: {
    from: TimeZone;
    to: TimeZone[];
  };
};

export const dayScheduleState: DayScheduleState = {
  startDate: customDayjs().format("YYYY-MM-DD 00:00"),
  timeSelectOption: {
    hour: hour12,
    minute: minutes,
  },
  selectedTime: {
    hour: 0,
    minute: 0,
    type: "AM",
  },
  timeZone: { from: "Asia/Tokyo", to: ["America/New_York", "Europe/Paris"] },
};
