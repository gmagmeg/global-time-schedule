import { DailyTimeMeridiemRadioProps } from "@app/week-time-edit/types/daily-time-meridiem-radio";
import { DailyTimeSelectBoxPops } from "@app/week-time-edit/types/daily-time-select-box";
import { WeekString } from "@app/week-time-edit/types/week-time-edit";

export type DailyTimeEditProps = {
  targetYoubi: WeekString;
  timeMeridiem: DailyTimeMeridiemRadioProps;
  timeSelectBox: DailyTimeSelectBoxPops;
};
