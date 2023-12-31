/**
 * @module _day-schedule
 */

/**
 * 型変換の関数は型と一緒に使うことが多いので、
 * このファイルに定義する
 */

// ex：11:00 AM
export type TimeZoneTime = string;
export const toTimeZoneTime = (timeZone: string): TimeZoneTime => {
  return timeZone as TimeZoneTime;
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
export const toHourNumber = (value: number | string): HourNumber => {
  return Number(value) as HourNumber;
};
export const toMinutesNumber = (value: number | string): MinutesNumber => {
  return Number(value) as MinutesNumber;
};

export type TimeType = "AM" | "PM" | "24h";
export const toTimeType = (value: string): TimeType => {
  return value as TimeType;
};
export type HourOrMinutes = HourNumber | MinutesNumber;

export const toHourOrMinutes = (number: number): HourOrMinutes => {
  return number as HourOrMinutes;
};
