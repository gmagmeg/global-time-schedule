/**
 * @module schedule
 */

import { TimeZone } from "@lib/type-date";
import { ScheduleState } from "./schedule-state";

export type ScheduleAction = {
  type: "CHANGE_TIME_ZONE";
  timeZone: TimeZone;
  index: number;
};

export const scheduleReducer = (
  state: ScheduleState,
  action: ScheduleAction
): ScheduleState => {
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
