import {
  HourTuple,
  HALF_HOUR_TUPLE,
  FULL_HOUR_TUPLE,
  HourUnion,
  MinutesUnion,
} from "@app/week-time-edit/types/time-select-box";
import { WeekUnion } from "@app/week-time-edit/types/week-time-edit";
import { HOUR_OPTION, HourOption } from "@app/week-time-edit/types/hour-option";

export type StateWeekEditReducer = {
  hourOption: HourOption;
  hoursSelectOption: HourTuple;
  timeSelectBox: {
    selectedYoubi: WeekUnion;
    selectedHour: HourUnion;
    selectedMinutes: MinutesUnion;
  }[];
};

export type ActionWeekEditReducerState =
  | { type: "CHANGE-HOUR-OPTION"; hourOption: HourOption }
  | {
      type: "CHANGE-TIME-HOUR";
      targetYoubi: WeekUnion;
      changedHour: HourUnion;
    };

export const weekEditReducer = (
  state: StateWeekEditReducer,
  action: ActionWeekEditReducerState
): StateWeekEditReducer => {
  switch (action.type) {
    /**
     * 12,24の時間表記の選択肢を変更した場合のケース
     */
    case "CHANGE-HOUR-OPTION":
      const changedHourOption = action.hourOption;
      let hoursSelectOption: HourTuple = HALF_HOUR_TUPLE;
      if (changedHourOption === HOUR_OPTION.full) {
        hoursSelectOption = FULL_HOUR_TUPLE;
      }

      return {
        ...state,
        hourOption: changedHourOption,
        hoursSelectOption,
      };
    /**
     * 時：分の時部分の変更時の更新処理
     */
    case "CHANGE-TIME-HOUR":
      const newTimeSelectBox = state.timeSelectBox.map((timeSelectBox) => {
        if (timeSelectBox.selectedYoubi === action.targetYoubi) {
          timeSelectBox.selectedHour = action.changedHour;
        }

        return timeSelectBox;
      });

      return {
        ...state,
        timeSelectBox: newTimeSelectBox,
      };
    default:
      throw new Error("割り振られていないアクションが実行されました。");
  }
};
