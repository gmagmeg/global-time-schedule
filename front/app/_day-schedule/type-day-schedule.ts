/**
 * @module _day-schedule
 */

/**
 * 型変換の関数は型と一緒に使うことが多いので、
 * このファイルに定義する
 */

// ex：11:00 AM
export type TimeZoneTime = string;

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
