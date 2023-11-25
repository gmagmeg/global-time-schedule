/**
 * @module GlobalMenu
 */

import { GlobalMenuState } from "../type-global-menu";
import { DateString } from "@/library/type-date";

/**
 * ここの型定義がreducerの引数の型定義になる
 */
export type GlobalMenuAction = {
  type: "SELECTED_START_DATE_ACTION";
  selectedStartDate: DateString;
};

/**
 * Reducerの関数定義
 *
 * @param state
 * @param action
 * @returns
 */
export const GlobalMenuReducer = (
  state: GlobalMenuState,
  action: GlobalMenuAction
): GlobalMenuState => {
  switch (action.type) {
    case "SELECTED_START_DATE_ACTION":
      return {
        ...state,
        selectedStartDate: action.selectedStartDate,
      };
    default:
      return state;
  }
};
