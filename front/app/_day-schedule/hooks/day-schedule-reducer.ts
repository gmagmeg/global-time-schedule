import type {
  MinutesNumber,
  DayScheduleState,
  HourOrMinutes,
} from "../type-day-schedule";

export type DayScheduleAction =
  | {
      type: "CHANGE_HOUR_SELECT_BOX";
      hour: HourOrMinutes;
    }
  | {
      type: "CHANGE_MINUTES_SELECT_BOX";
      minutes: HourOrMinutes;
    };

export const DayScheduleReducer = (
  state: DayScheduleState,
  action: DayScheduleAction
): DayScheduleState => {
  switch (action.type) {
    case "CHANGE_HOUR_SELECT_BOX":
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          hour: action.hour,
        },
      };
    case "CHANGE_MINUTES_SELECT_BOX":
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          minute: action.minutes,
        },
      };
    default:
      return state;
  }
};
