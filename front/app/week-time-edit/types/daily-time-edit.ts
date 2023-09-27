import { TimeMeridiemRadioProps } from "@app/week-time-edit/types/time-meridiem-radio";
import { TimeSelectBoxPops } from "@app/week-time-edit/types/time-select-box";
import { WeekString } from "@app/week-time-edit/types/week-time-edit";

export type DailyTimeEditProps = {
  targetYoubi: WeekString;
  timeMeridiem: TimeMeridiemRadioProps;
  timeSelectBox: TimeSelectBoxPops;
};
