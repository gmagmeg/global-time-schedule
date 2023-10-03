import {
  HourTuple,
  HALF_HOUR_TUPLE,
  FULL_HOUR_TUPLE,
  HourUnion,
  MinutesUnion,
} from "@editContents/week-time-edit/types/time-select-box";
import { WeekUnion } from "@editContents/week-time-edit/types/week-time-edit";
import {
  HOUR_OPTION,
  HourOption,
} from "@editContents/week-time-edit/types/hour-option";
import { TimeMeridiemUnion } from "@editContents/week-time-edit/types/time-meridiem-radio";

type TimeSelectBoxProps = {
  selectedYoubi: WeekUnion;
  selectedHour: HourUnion;
  selectedMinutes: MinutesUnion;
  selectedTimeMeridiem: TimeMeridiemUnion;
};

export type StateWeekEditReducer = {
  hourOption: HourOption;
  hoursSelectOption: HourTuple;
  timeSelectBox: TimeSelectBoxProps[];
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
        if (findTargetYoubi(timeSelectBox, action.targetYoubi)) {
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
        if (findTargetYoubi(timeSelectBox, action.targetYoubi)) {
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
        if (findTargetYoubi(timeSelectBox, action.targetYoubi)) {
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

const findTargetYoubi = (
  timeSelectBox: TimeSelectBoxProps,
  targetYoubi: WeekUnion
) => {
  return timeSelectBox.selectedYoubi === targetYoubi;
};

export const initialReduceState: StateWeekEditReducer = {
  hourOption: HOUR_OPTION.half,
  hoursSelectOption: HALF_HOUR_TUPLE,
  timeSelectBox: [
    {
      selectedYoubi: "日",
      selectedHour: "00",
      selectedMinutes: "00",
      selectedTimeMeridiem: "PM",
    },
    {
      selectedYoubi: "月",
      selectedHour: "00",
      selectedMinutes: "00",
      selectedTimeMeridiem: "PM",
    },
    {
      selectedYoubi: "火",
      selectedHour: "00",
      selectedMinutes: "00",
      selectedTimeMeridiem: "PM",
    },
    {
      selectedYoubi: "水",
      selectedHour: "00",
      selectedMinutes: "00",
      selectedTimeMeridiem: "PM",
    },
    {
      selectedYoubi: "木",
      selectedHour: "00",
      selectedMinutes: "00",
      selectedTimeMeridiem: "PM",
    },
    {
      selectedYoubi: "金",
      selectedHour: "00",
      selectedMinutes: "00",
      selectedTimeMeridiem: "PM",
    },
    {
      selectedYoubi: "土",
      selectedHour: "00",
      selectedMinutes: "00",
      selectedTimeMeridiem: "PM",
    },
  ],
};
