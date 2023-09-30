import {
  HourTuple,
  HALF_HOUR_TUPLE,
  FULL_HOUR_TUPLE,
} from "@app/week-time-edit/types/time-select-box";
import { WeekUnion } from "@app/week-time-edit/types/week-time-edit";
import { HOUR_OPTION, HourOption } from "@app/week-time-edit/types/hour-option";

export type StateWeekEditReducer = {
  hourOption: HourOption;
  timeSelectBox: {
    targetYoubi: WeekUnion;
    hours: HourTuple;
  };
};

export type ActionWeekEditReducerState = {
  type: "ChangeHourOption";
  hourOption: HourOption;
};

export const weekEditReducer = (
  state: StateWeekEditReducer,
  action: ActionWeekEditReducerState
): StateWeekEditReducer => {
  switch (action.type) {
    /**
     * 12,24の時間表記の選択肢を変更した場合のケース
     */
    case "ChangeHourOption":
      const changedHourOption = action.hourOption;
      let timeSelectBoxHours: HourTuple = HALF_HOUR_TUPLE;
      if (changedHourOption === HOUR_OPTION.half) {
        timeSelectBoxHours = HALF_HOUR_TUPLE;
      } else {
        timeSelectBoxHours = FULL_HOUR_TUPLE;
      }

      return {
        ...state,
        hourOption: changedHourOption,
        timeSelectBox: {
          ...state.timeSelectBox,
          hours: timeSelectBoxHours,
        },
      };
    default:
      return state;
  }
};
