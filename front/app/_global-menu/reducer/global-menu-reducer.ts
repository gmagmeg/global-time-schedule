import { GlobalMenuState, DateString } from "../type-global-menu";

/**
 * ここの型定義がreducerの引数の型定義になる
 */
export type GlobalMenuAction = {
  type: "SELECTED_START_DATE_ACTION";
  selectedDate: DateString;
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
        selectedDate: action.selectedDate,
      };
    default:
      return state;
  }
};
