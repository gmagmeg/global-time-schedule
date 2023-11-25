/**
 * @module _day-schedule
 */
import { HourNumber, MinutesNumber } from "./type-day-schedule";

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
