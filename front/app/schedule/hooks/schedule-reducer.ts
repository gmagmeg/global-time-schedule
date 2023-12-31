/**
 * @module schedule
 * スケジュールの時間に関する状態を管理する
 * 日付に関する状態は別に管理する
 */

import { DateString, TimeZone, toDateString } from "@/library/type-date";
import dayjs from "dayjs";
import {
  reMappingWeekDateTimes,
  updateWeekDateTimes,
} from "./schedule-reducer-function";
import {
  HourNumber,
  MinutesNumber,
  TimeType,
} from "@/app/_day-schedule/type-day-schedule";

/********************************************
 * TypeとStateの定義
 *********************************************/
export type WeekDateTime = {
  Date: DateString;
  Time: {
    hour: HourNumber;
    minutes: MinutesNumber;
    type: TimeType;
  };
};
export type WeekDateTimes = Map<WeekDateTime["Date"], WeekDateTime["Time"]>;

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
   * ex: <
   * ["2023-01-01", {hour: 12 minutes: 00, type: {"AM"}} ],
   * ["2023-01-02", {hour: 10 minutes: 30, type: {"PM"}} ]
   * ・・・>
   */
  weekDateTimes: WeekDateTimes;
  weekStartDate: DateString;
};

export const toTimeZone = (timeZone: string): TimeZone => {
  return timeZone as TimeZone;
};

const initDate = dayjs().format("YYYY-MM-DD") as DateString;
export const scheduleState: ScheduleState = {
  timeZones: ["JST", "UTF"],
  weekDateTimes: reMappingWeekDateTimes(initDate),
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
      type: "UPDATE_HOUR_MINUTES";
      updateDate: WeekDateTime["Date"];
      updateTime: WeekDateTime["Time"];
    };

export const ScheduleReducer = (
  state: ScheduleState,
  action: ScheduleAction
): ScheduleState => {
  switch (action.type) {
    case "DECIDE_SCHEDULE_START_DATE":
      return {
        ...state,
        weekDateTimes: reMappingWeekDateTimes(
          action.weekStartDate,
          state.weekDateTimes
        ),
        weekStartDate: action.weekStartDate,
      };
    case "CHANGE_TIME_ZONE":
      return {
        ...state,
        timeZones: state.timeZones.map((timeZone: TimeZone, index) => {
          return index === action.index ? action.timeZone : timeZone;
        }),
      };
    case "UPDATE_HOUR_MINUTES":
      return {
        ...state,
        weekDateTimes: updateWeekDateTimes(
          state.weekDateTimes,
          action.updateDate,
          action.updateTime
        ),
      };
    default:
      return state;
  }
};
