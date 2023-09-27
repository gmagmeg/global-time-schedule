import { MouseEvent } from "react";
import type { WeekString } from "@app/week-time-edit/types/week-time-edit";

export const TIME_MEDIUM_TUPLE = ["AM", "PM"] as const;
export type TimeMeridiemTuple = typeof TIME_MEDIUM_TUPLE;
export type TimeMeridiemString = (typeof TIME_MEDIUM_TUPLE)[number];

export const toTimeMeridiem = (value: string) => {
  return value === "AM" ? "AM" : "PM";
};

export type TimeMeridiemRadioProps = {
  checked: TimeMeridiemString;
  targetYoubi: WeekString;
  onChange: (props: {
    value: TimeMeridiemString;
    targetYoubi: WeekString;
  }) => void;
};
