/**
 * @module _day-schedule
 */

/**
 * 型変換の関数は型と一緒に使うことが多いので、
 * このファイルに定義する
 */
export type NoneNumber = "--";
export type NoneString = "none";

/**
 * 何もない状態は、"--"という文字列で表現している
 */
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
  | 24
  | NoneNumber;

/**
 * 何もない状態は、"--"という文字列で表現している
 */
export type MinutesNumber = 0 | 30 | NoneNumber;
export const toHourNumber = (value: number | string): HourNumber => {
  return Number(value) as HourNumber;
};
export const toMinutesNumber = (value: number | string): MinutesNumber => {
  return Number(value) as MinutesNumber;
};

export type TimeType = "AM" | "PM" | "24h" | NoneString;
export const toTimeType = (value: string): TimeType => {
  return value as TimeType;
};
export type HourOrMinutes = HourNumber | MinutesNumber;

export const toHourOrMinutes = (number: number): HourOrMinutes => {
  return number as HourOrMinutes;
};
