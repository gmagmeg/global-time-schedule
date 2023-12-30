/**
 * @module schedule
 * スケジュールの時間に関する状態を管理する
 * 日付に関する状態は別に管理する
 */

import {
  DateString,
  HourMinutesFormat,
  TimeZone,
  toDateString,
} from "@/library/type-date";
import dayjs from "dayjs";

/********************************************
 * TypeとStateの定義
 *********************************************/
export type ScheduleState = {
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
  timeZones: TimeZone[];
  /**
   * ex: < "2023-01-01", "12:00 AM" >
   */
  dateTimes: Map<DateString, HourMinutesFormat>;
  weekStartDate: DateString;
};

export const toTimeZone = (timeZone: string): TimeZone => {
  return timeZone as TimeZone;
};

export const scheduleState: ScheduleState = {
  timeZones: ["JST", "UTF"],
  dateTimes: new Map<DateString, HourMinutesFormat>([
    [
      dayjs().format("YYYY-MM-DD") as DateString,
      "00:00 AM" as HourMinutesFormat,
    ],
  ]),
  weekStartDate: toDateString("2023-11-26"),
};

/********************************************
 * ActionとReducer定義
 *********************************************/
export type ScheduleAction =
  | {
      type: "DECIDE_SCHEDULE_START_DATE";
      weekStartDate: DateString;
    }
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

export const ScheduleReducer = (
  state: ScheduleState,
  action: ScheduleAction
): ScheduleState => {
  switch (action.type) {
    case "DECIDE_SCHEDULE_START_DATE":
      return {
        ...state,
        weekStartDate: action.weekStartDate,
      };
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
        dateTimes: new Map(state.dateTimes).set(
          action.date,
          action.hourMinutes
        ),
      };
    default:
      return state;
  }
};
