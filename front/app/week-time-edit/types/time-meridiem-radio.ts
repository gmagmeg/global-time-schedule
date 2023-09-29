import type { WeekUnion } from "@app/week-time-edit/types/week-time-edit";
import { HoursOptionUnion } from "./time-select-box";

export const TIME_MEDIUM_TUPLE = ["AM", "PM"] as const;
export type TimeMeridiemTuple = typeof TIME_MEDIUM_TUPLE;
export type TimeMeridiemString = (typeof TIME_MEDIUM_TUPLE)[number];
export type TimeMeridiemOnChangeProps = {
  value: TimeMeridiemString;
  targetYoubi: WeekUnion;
};

export const toTimeMeridiem = (value: string) => {
  return value === "AM" ? "AM" : "PM";
};

export type TimeMeridiemRadioProps = {
  checked: TimeMeridiemString;
  hoursOption: HoursOptionUnion;
  targetYoubi: WeekUnion;
  onChange: (props: TimeMeridiemOnChangeProps) => void;
};
