/**
 * @module _main-contents
 */

import { TimeZone } from "@lib/type-date";
import { MainContentsState } from "./main-contents-state";

export type MainContentsAction = {
  type: "CHANGE_TIME_ZONE";
  timeZone: TimeZone;
  index: number;
};

export const mainContentsReducer = (
  state: MainContentsState,
  action: MainContentsAction
): MainContentsState => {
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
