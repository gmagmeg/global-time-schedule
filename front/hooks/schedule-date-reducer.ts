/**
 * @module hooks
 *
 * スケジュールの日付に関する状態を管理する
 * 時間は含まず、サマータイムの影響は別に管理する
 */

import { DateString } from "@lib/type-date";

/********************************************
 * TypeとStateの定義
 *********************************************/
export type ScheduleDateState = {
  weekStartDate: DateString;
};

/**
 * ex: 2023-11-26
 */
export const scheduleDateState = {
  weekStartDate: "2023-11-26",
};

/********************************************
 * Action定義
 *********************************************/
export type ScheduleDateAction = {
  /**
   * 決定した開始日をもとに、１週間分のスケジュールが生成される
   */
  type: "DECIDE_SCHEDULE_START_DATE";
  weekStartDate: DateString;
};

/********************************************
 * Reducer定義
 *********************************************/
export const ScheduleDateReducer = (
  state: ScheduleDateState,
  action: ScheduleDateAction
): ScheduleDateState => {
  switch (action.type) {
    case "DECIDE_SCHEDULE_START_DATE":
      return {
        ...state,
        weekStartDate: action.weekStartDate,
      };
    default:
      return state;
  }
};
