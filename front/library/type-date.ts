/**
 * ex: 2023-01-01
 */
export type DateString = string;
export const toDateString = (from: string): DateString => {
  return from;
};

/**
 * ex: 2023-01-01T12:34:00
 */
export type DateTimeString = string;

/**
 * 出来れば厳密にしたいが、如何せん多すぎるので、stringで妥協する
 */
export type TimeZone = string;
