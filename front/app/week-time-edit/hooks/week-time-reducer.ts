import {
  HourTuple,
  HALF_HOUR_TUPLE,
  FULL_HOUR_TUPLE,
  HourUnion,
  MinutesUnion,
} from "@app/week-time-edit/types/time-select-box";
import { WeekUnion } from "@app/week-time-edit/types/week-time-edit";
import { HOUR_OPTION, HourOption } from "@app/week-time-edit/types/hour-option";
import { TimeMeridiemUnion } from "@app/week-time-edit/types/time-meridiem-radio";

export type StateWeekEditReducer = {
  hourOption: HourOption;
  hoursSelectOption: HourTuple;
  timeSelectBox: {
    selectedYoubi: WeekUnion;
    selectedHour: HourUnion;
    selectedMinutes: MinutesUnion;
    selectedTimeMeridiem: TimeMeridiemUnion;
  }[];
};

export type ActionWeekEditReducerState =
  | { type: "CHANGE-HOUR-OPTION"; hourOption: HourOption }
  | {
      type: "CHANGE-TIME-HOUR";
      targetYoubi: WeekUnion;
      changedHour: HourUnion;
    }
  | {
      type: "CHANGE-TIME-MINUTES";
      targetYoubi: WeekUnion;
      changedMinutes: MinutesUnion;
    }
  | {
      type: "CHANGE-TIME-MERIDIEM";
      targetYoubi: WeekUnion;
      changedTimeMeridiem: TimeMeridiemUnion;
    };

/**
 * // @todo if (timeSelectBox.selectedYoubi === action.targetYoubi) {
 * この部分を纏めたい
 * targetYoubiが同じかどうかを判定する関数を作成したい
 * find~的なやつ
 */

export const weekEditReducer = (
  state: StateWeekEditReducer,
  action: ActionWeekEditReducerState
): StateWeekEditReducer => {
  let newValue: any = {};

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
     * AM/PMの選択肢の更新処理
     */
    case "CHANGE-TIME-MERIDIEM":
      newValue = state.timeSelectBox.map((timeSelectBox) => {
        if (timeSelectBox.selectedYoubi === action.targetYoubi) {
          timeSelectBox.selectedTimeMeridiem = action.changedTimeMeridiem;
        }

        return timeSelectBox;
      });

      return {
        ...state,
        timeSelectBox: newValue,
      };

    /**
     * 時：分の「時」部分の変更時の更新処理
     */
    case "CHANGE-TIME-HOUR":
      newValue = state.timeSelectBox.map((timeSelectBox) => {
        if (timeSelectBox.selectedYoubi === action.targetYoubi) {
          timeSelectBox.selectedHour = action.changedHour;
        }

        return timeSelectBox;
      });

      return {
        ...state,
        timeSelectBox: newValue,
      };
    /**
     * 時：分の「分」部分の変更時の更新処理
     */
    case "CHANGE-TIME-MINUTES":
      newValue = state.timeSelectBox.map((timeSelectBox) => {
        if (timeSelectBox.selectedYoubi === action.targetYoubi) {
          timeSelectBox.selectedMinutes = action.changedMinutes;
        }

        return timeSelectBox;
      });

      return {
        ...state,
        timeSelectBox: newValue,
      };
    default:
      throw new Error("割り振られていないアクションが実行されました。");
  }
};
