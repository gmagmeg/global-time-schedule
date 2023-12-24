/**
 * @module _day-schedule
 */

/**
 * 型変換の関数は型と一緒に使うことが多いので、
 * このファイルに定義する
 */

import { DateString, HourMinutesFormat, TimeZone } from "@/library/type-date";
import { customDayjs } from "@lib/dayjs";
import {
  HourNumber,
  HourOrMinutes,
  MinutesNumber,
  TimeType,
} from "../type-day-schedule";

/**
 * 0と30のみを選択できるようにしている
 */
export const minutes: MinutesNumber[] = [0, 30];
/**
 * 0から12までの時間を扱う
 */
export const hour12: HourNumber[] = Array.from(
  { length: 13 },
  (_, index) => index as HourNumber
);
/**
 * 0から24までの時間を扱う
 */
export const hour24: HourNumber[] = Array.from(
  { length: 25 },
  (_, index) => index as HourNumber
);

/**
 * 例：UTC+10, UTC-8
 */
export type UtcString = string;

/**
 * abb: Timezone
 */
export type TimeZoneInfo = {
  abb: TimeZone;
  full: HourMinutesFormat;
  utc: UtcString;
};

export type DayScheduleState = {
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
  displayTimes: HourMinutesFormat[];
  /**
   * タイムゾーンに関する情報を含む配列
   * - from: タイムゾーンを表す文字列
   * - to: タイムゾーンに応じた時間
   */
  timeZone: {
    from: TimeZoneInfo;
    to: TimeZoneInfo[];
    toIndex: number;
  };
};

export const dayScheduleState: DayScheduleState = {
  /**
   *  スケジュールの開始日時を "YYYY-MM-DD 00:00" の形式で格納します。
   */
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
  displayTimes: ["00:00 AM", "00:00 AM", "00:00 AM"],
  timeZone: {
    from: { abb: "JST", full: "Japan Standard Time", utc: "UTC+9" },
    to: [{ abb: "UTC", full: "Coordinated Universal Time", utc: "UTC+0" }],
    toIndex: 0,
  },
};
