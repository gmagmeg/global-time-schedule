/**
 * @module hooks
 * スケジュールの時間に関する状態を管理する
 * 日付に関する状態は別に管理する
 */

import { TimeZone } from "@/library/type-date";

/********************************************
 * TypeとStateの定義
 *********************************************/
export type TimeZoneState = {
  /**
   * タイムゾーンを表す文字列
   */
  timeZones: TimeZone[];
};

export const toTimeZone = (timeZone: string): TimeZone => {
  return timeZone as TimeZone;
};

export const timeZoneState: TimeZoneState = {
  timeZones: ["JST", "UTF"],
};

/********************************************
 * Action定義
 *********************************************/
export type TimeZoneAction = {
  type: "CHANGE_TIME_ZONE";
  timeZone: TimeZone;
  index: number;
};

/********************************************
 * Reducer定義
 *********************************************/
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
    default:
      return state;
  }
};
