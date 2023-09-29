import { TimeMeridiemRadioProps } from "@app/week-time-edit/types/time-meridiem-radio";
import { TimeSelectBoxPops } from "@app/week-time-edit/types/time-select-box";
import { WeekUnion } from "@app/week-time-edit/types/week-time-edit";

export type DailyTimeEditProps = {
  targetYoubi: WeekUnion;
  timeMeridiem: TimeMeridiemRadioProps;
  timeSelectBox: TimeSelectBoxPops;
};
