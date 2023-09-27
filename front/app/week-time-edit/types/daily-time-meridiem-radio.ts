import { MouseEvent } from "react";
import type { YoubiString } from "@app/week-time-edit/types-week-time-edit";

export const TIME_MEDIUM_TUPLE = ["AM", "PM"] as const;
export type TimeMeridiemTuple = typeof TIME_MEDIUM_TUPLE;
export type TimeMeridiemString = (typeof TIME_MEDIUM_TUPLE)[number];

export type DailyTimeMeridiemRadioProps = {
  checked: TimeMeridiemString;
  targetYoubi: YoubiString;
  onChange: (
    changeMediumString: YoubiString,
    event: MouseEvent<HTMLDivElement>
  ) => void;
};
