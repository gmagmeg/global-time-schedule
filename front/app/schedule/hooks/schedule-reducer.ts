/**
 * @module schedule
 * スケジュール関する状態を管理する
 */

import { DateString, TimeZone } from "@/library/type-date";
import dayjs from "dayjs";
import {
  convertWeekTimeZoneTime,
  getInitTimeZone,
  initTimeZoneSchedule,
  reMappingWeekDateTimes,
  updateWeekDateTimes,
} from "./schedule-reducer-function";
import {
  HourNumber,
  MinutesNumber,
  TimeType,
} from "@/app/_day-schedule/type-day-schedule";
import { moveToNextSunday } from "@/hooks/time-zone-function";
import { findTimeZoneValue } from "@lib/mapping-timezone";

/********************************************
 * TypeとStateの定義
 *********************************************/
export type TimeFormat = {
  hour: HourNumber;
  minutes: MinutesNumber;
  type: TimeType;
};

export type WeekDateTime = {
  Date: DateString;
  Time: TimeFormat;
};

/**
 * 日付{@link WeekDateTimes}と違って、
 * 日付と正確な曜日を紐づける必要はないので、配列で管理する
 */
export type TimeZoneTime = {
  first: TimeFormat;
  second: TimeFormat;
  third: TimeFormat;
};
export type TimeZoneSchedule = [
  TimeZoneTime, // index:0
  TimeZoneTime,
  TimeZoneTime,
  TimeZoneTime,
  TimeZoneTime,
  TimeZoneTime,
  TimeZoneTime // index:6
  // 1週間分が上限値なので、これ以上増やさない
];

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

/**
 * 12時間制と24時間制のどちらを使用するかを管理する
 */
export type TimeTypePattern = "AM/PM" | "24h";

export type ScheduleState = {
  /**
   * タイムゾーン
   * ex: Map<
   *  "first": {abb: "UTC", full: "Coordinated Universal Time", utc: "UTC+0"},
   *  "second": {abb: "none", full: "none", utc: "none"}, // 未定義の場合
   *  "third": {abb: "none", full: "none", utc: "none"}, // 未定義の場合
   *  }>
   */
  timeZones: TimeZones;

  /**
   * "AM/PM" | "24h"
   */
  timeTypePattern: TimeTypePattern;

  /**
   * タイムゾーン毎の時間は、この値をもとに再計算する
   * タイムゾーン毎の時間は{@link ScheduleState.timeZoneSchedule}で管理している
   * ex: Map<
   * ["2023-01-01", {hour: 12 minutes: 00, type: "AM"} ],
   * ["2023-01-02", {hour: 10 minutes: 30, type: "PM"} ]
   * ・・・>
   */
  weekDateTimes: WeekDateTimes;

  /**
   * この形式のデータを１週間分持っているが、特に日付との関連性は薄いため、Mapではなく配列で管理している
   * タイムゾーンによって、値が再計算される
   * ex: [
   * {
   *  first: {hour: 12 minutes: 00, type: "AM"},
   *  second: {hour: -- minutes: --, type: "none"},
   *  third: {hour: -- minutes: --, type: "none"}
   * },
   * {・・・}
   * ],
   */
  timeZoneSchedule: TimeZoneSchedule;

  /** ex:2023-01-01 */
  weekStartDate: DateString;
};

export const toTimeZone = (timeZone: string): TimeZone => {
  return timeZone as TimeZone;
};

const initDate = moveToNextSunday();
export const scheduleState: ScheduleState = {
  timeTypePattern: "AM/PM",
  timeZones: new Map<TimeZoneKey, TimeZoneValue>([
    ["first", { abb: "UTC", full: "Coordinated Universal Time", utc: "UTC+0" }],
    ["second", getInitTimeZone()],
    ["third", getInitTimeZone()],
  ]),
  weekDateTimes: reMappingWeekDateTimes(initDate),
  timeZoneSchedule: initTimeZoneSchedule(),
  weekStartDate: initDate,
};

/********************************************
 * ActionとReducer定義
 *********************************************/
export type ScheduleAction =
  | {
      type: "DECIDE_TIME_TYPE_PATTERN";
      timeTypePattern: TimeTypePattern;
    }
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

/**
 * Reducer内での決め事
 * ・他のcase文の処理に影響を与えないようにするため、
 * 　Action名をキャメルケースで表した関数を作成して、その中で値の更新処理を行う
 * ・結果格納関数の再定義は許可したいので、constではなくletで定義する
 */
export const ScheduleReducer = (
  state: ScheduleState,
  action: ScheduleAction
): ScheduleState => {
  switch (action.type) {
    case "DECIDE_TIME_TYPE_PATTERN":
      const decideTimeTypePattern = () => {
        const newWeekDateTime = new Map<WeekDateTime["Date"], TimeFormat>();
        if (action.timeTypePattern === "24h") {
          state.weekDateTimes.forEach((value, date) => {
            newWeekDateTime.set(date, { ...value, type: "24h" });
          });
        } else {
          state.weekDateTimes.forEach((value, date) => {
            newWeekDateTime.set(date, { ...value, type: "AM" });
          });
        }

        return { timeTypePattern: action.timeTypePattern, newWeekDateTime };
      };

      const resultDecideTimeTypePattern = decideTimeTypePattern();

      return {
        ...state,
        timeTypePattern: resultDecideTimeTypePattern.timeTypePattern,
        weekDateTimes: resultDecideTimeTypePattern.newWeekDateTime,
      };
    /**
     * １週間の開始日を決定する。
     * サマータイムは考慮しないで進めているので、
     * 特に各タイムゾーンの算出時間は再計算しない
     */
    case "DECIDE_SCHEDULE_START_DATE":
      return {
        ...state,
        weekDateTimes: reMappingWeekDateTimes(
          action.weekStartDate,
          state.weekDateTimes
        ),
        weekStartDate: action.weekStartDate,
      };
    /**
     * タイムゾーンを変更に伴って、各タイムゾーンの時間を再計算する
     * 日付には何も影響がないので、変更しない
     */
    case "CHANGE_TIME_ZONE":
      const changeTimeZone = (
        timeZoneKey: TimeZoneKey,
        timeZoneAbb: TimeZoneAbb,
        timeZones: ScheduleState["timeZones"],
        weekDateTime: ScheduleState["weekDateTimes"]
      ) => {
        const newTimeZoneMap = new Map<TimeZoneKey, TimeZoneValue>([]);
        timeZones.forEach((value, key) => {
          if (key === timeZoneKey) {
            newTimeZoneMap.set(key, findTimeZoneValue(timeZoneAbb));
          } else {
            newTimeZoneMap.set(key, value);
          }
        });

        const newWeekTimeZoneTime = convertWeekTimeZoneTime(
          weekDateTime,
          newTimeZoneMap
        );

        return { newTimeZoneMap, newWeekTimeZoneTime };
      };

      const resultChangeTimeZone = changeTimeZone(
        action.updateTimeZoneKey,
        action.updateTimeZoneAbb,
        state.timeZones,
        state.weekDateTimes
      );

      return {
        ...state,
        timeZoneSchedule: resultChangeTimeZone.newWeekTimeZoneTime,
        timeZones: resultChangeTimeZone.newTimeZoneMap,
      };
    /**
     * 各曜日の時：分を更新する
     * タイムゾーンと関係が深いので、この値が変動した場合は
     * 各タイムゾーンの時間を再計算する
     */
    case "UPDATE_HOUR_MINUTES":
      const updateHourMinutes = (
        timeZones: ScheduleState["timeZones"],
        weekDateTime: ScheduleState["weekDateTimes"]
      ) => {
        const newWeekDateTimes = updateWeekDateTimes(
          weekDateTime,
          action.updateDate,
          action.updateTime
        );

        const newWeekTimeZoneTime = convertWeekTimeZoneTime(
          newWeekDateTimes,
          timeZones
        );

        return { newWeekDateTimes, newWeekTimeZoneTime };
      };

      const resultUpdateHourMinutes = updateHourMinutes(
        state.timeZones,
        state.weekDateTimes
      );

      return {
        ...state,
        weekDateTimes: resultUpdateHourMinutes.newWeekDateTimes,
        timeZoneSchedule: resultUpdateHourMinutes.newWeekTimeZoneTime,
      };
    default:
      return state;
  }
};
