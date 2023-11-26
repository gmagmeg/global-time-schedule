import { DateString } from "@/library/type-date";

export type WeekScheduleState = {
  /**
   * １週間の中から、選択された日付を表す日付文字列
   */
  selectedDate: DateString;
};
export const weekScheduleState: WeekScheduleState = {
  selectedDate: "2023-11-26",
};

export type WeekScheduleAction = {
  type: "CLICK_DATE_BUTTON";
  clickDate: DateString;
};

export const weekScheduleReducer = (
  state: WeekScheduleState,
  action: WeekScheduleAction
): WeekScheduleState => {
  switch (action.type) {
    case "CLICK_DATE_BUTTON":
      return {
        ...state,
        selectedDate: action.clickDate,
      };
    default:
      return state;
  }
};
