/**
 * @module hooks
 * スケジュールの時間に関する状態を管理する
 * 日付に関する状態は別に管理する
 */

import { DateString, HourMinutesFormat, TimeZone } from "@/library/type-date";
import dayjs from "dayjs";

/********************************************
 * TypeとStateの定義
 *********************************************/
export type TimeZoneState = {
  /**
   * ex：["JST", "UTF", "GMT"]
   */
  /**
   * ex: <
   *  "2023-01-01", {
   *    abb: "UTC";
   *    full: "Coordinated Universal Time";
   *    utc: "UTC+0"";
   *  }>
   */
  // @todo ↑に持たせた方がいい
  timeZones: TimeZone[];
  // ↑　Map<DateString, TimeZoneInfo>にしたい
  /**
   * ex: < "2023-01-01", "12:00 AM" >
   */
  dateTime: Map<DateString, HourMinutesFormat>;
};

export const toTimeZone = (timeZone: string): TimeZone => {
  return timeZone as TimeZone;
};

export const timeZoneState: TimeZoneState = {
  timeZones: ["JST", "UTF"],
  dateTime: new Map<DateString, HourMinutesFormat>([
    [
      dayjs().format("YYYY-MM-DD") as DateString,
      "00:00 AM" as HourMinutesFormat,
    ],
  ]),
};

/********************************************
 * ActionとReducer定義
 *********************************************/
export type TimeZoneAction =
  | {
      type: "CHANGE_TIME_ZONE";
      timeZone: TimeZone;
      index: number;
    }
  | {
      type: "CHANGE_HOUR_MINUTES";
      date: DateString;
      hourMinutes: HourMinutesFormat;
    };

export const TimeZoneReducer = (
  state: TimeZoneState,
  action: TimeZoneAction
): TimeZoneState => {
  switch (action.type) {
    case "CHANGE_TIME_ZONE":
      return {
        ...state,
        timeZones: state.timeZones.map((timeZone: TimeZone, index) => {
          return index === action.index ? action.timeZone : timeZone;
        }),
      };
    case "CHANGE_HOUR_MINUTES":
      return {
        ...state,
        dateTime: new Map(state.dateTime).set(action.date, action.hourMinutes),
      };
    default:
      return state;
  }
};
