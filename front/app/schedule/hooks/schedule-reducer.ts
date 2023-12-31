/**
 * @module schedule
 * スケジュール関する状態を管理する
 */

import { DateString, TimeZone } from "@/library/type-date";
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
import { moveToNextSunday } from "@/hooks/time-zone-function";
import { mappingTimezone } from "@lib/mapping-timezone";

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

/** ex：GMT, UTF, JST */
export type TimeZoneAbb = string & { __brand: "dateTimeString" };
export type TimeZoneKey = "first" | "second" | "third";
export type TimeZoneValue = {
  abb: string;
  full: string;
  utc: string;
};

export type TimeZones = Map<TimeZoneKey, TimeZoneValue>;

export type ScheduleState = {
  /**
   * ex: <
   *  "first", {abb: "UTC", full: "Coordinated Universal Time", utc: "UTC+0",
   *  "second", {abb: "", full: "", utc: "", // 未定義の場合は空で定義
   *  "third", {abb: "", full: "", utc: "",
   *  }>
   */
  timeZones: TimeZones;
  /**
   * ex: <
   * ["2023-01-01", {hour: 12 minutes: 00, type: {"AM"}} ],
   * ["2023-01-02", {hour: 10 minutes: 30, type: {"PM"}} ]
   * ・・・>
   */
  weekDateTimes: WeekDateTimes;
  /** ex:2023-01-01 */
  weekStartDate: DateString;
};

export const toTimeZone = (timeZone: string): TimeZone => {
  return timeZone as TimeZone;
};

const initDate = dayjs().format("YYYY-MM-DD") as DateString;
export const scheduleState: ScheduleState = {
  timeZones: new Map<TimeZoneKey, TimeZoneValue>([
    ["first", { abb: "UTC", full: "Coordinated Universal Time", utc: "UTC+0" }],
    ["second", { abb: "", full: "", utc: "" }],
    ["third", { abb: "", full: "", utc: "" }],
  ]),
  weekDateTimes: reMappingWeekDateTimes(initDate),
  weekStartDate: moveToNextSunday(),
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
      updateTimeZoneAbb: TimeZoneAbb;
      updateTimeZoneKey: TimeZoneKey;
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
      /**
       * @todo ここにupdateの処理を書く
       *
       * updateTimeZoneKeyが更新するstateの要素のkey
       * updateTimeZoneAbbがタイムゾーン一覧から、情報を引っ張ってくるためのkey
       *
       * 1:
       * updateTimeZoneAbbがタイムゾーン一覧から、情報を引っ張ってくる
       *
       * 2：
       * updateTimeZoneAbbを使って、タイムゾーン一覧から、更新後のTimezoneValueを取得する
       *
       * 3：
       * state.timeZonesの値を更新する
       * Mapで管理しているので、foreachで回して、新しい値を作る
       *
       * ↑ ここまでをfunctionファイルに切り出す
       */

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
