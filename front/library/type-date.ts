/**
 * ex: 2023-01-01
 */
export type DateString = string & { __brand: "dateString" };
export const toDateString = (from: string): DateString => {
  return from as DateString;
};

/**
 * ex: 2023-01-01T12:34:00
 */
export type DateTimeString = string & { __brand: "dateTimeString" };
export const toDateTimeString = (from: string): DateTimeString => {
  return from as DateTimeString;
};

/**
 * ex: 11:00 AM
 * or
 * ex: 23:00
 */
export type HourMinutesFormat = string;

/**
 * ex：UTC, AST
 */
export type TimeZone = string;
