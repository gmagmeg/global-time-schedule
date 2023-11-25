/**
 * @module _day-schedule
 */

import { DateString, TimeZone } from "@/library/type-date";

/**
 * 型変換の関数は型と一緒に使うことが多いので、
 * このファイルに定義する
 */

// ex：11:00 AM
export type TimeZoneTime = string;

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

export type HourNumber =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

export type MinutesNumber = 0 | 30;
export type TimeType = "AM" | "PM" | "24h";
export type HourOrMinutes = HourNumber | MinutesNumber;

export const toHourOrMinutes = (number: number): HourOrMinutes => {
  return number as HourOrMinutes;
};
