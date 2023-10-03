import { TimeMeridiemRadioProps } from "@editContents/week-time-edit/types/time-meridiem-radio";
import { TimeSelectBoxPops } from "@editContents/week-time-edit/types/time-select-box";
import { WeekUnion } from "@editContents/week-time-edit/types/week-time-edit";

export type DailyTimeEditProps = {
  targetYoubi: WeekUnion;
  timeMeridiem: TimeMeridiemRadioProps;
  timeSelectBox: TimeSelectBoxPops;
};
