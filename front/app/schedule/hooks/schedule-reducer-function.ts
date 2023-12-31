import { WeekDateTime, WeekDateTimes } from "./schedule-reducer";
import { createWeekRange } from "@/library/dayjs";
import { ScheduleState } from "./schedule-reducer";

/**
 * 生成される値は{@link ScheduleState}を参照
 */
export const initWeekDateTimes = (
  weekStartDate: ScheduleState["weekStartDate"]
): WeekDateTimes => {
  const decideWeekRange = createWeekRange(weekStartDate);

  return new Map<WeekDateTime["Date"], WeekDateTime["Time"]>(
    decideWeekRange.map((date) => {
      return [
        date as WeekDateTime["Date"],
        {
          hour: 0,
          minutes: 0,
          type: "AM",
        } as WeekDateTime["Time"],
      ];
    })
  );
};

/**
 * 更新後の値は{@link ScheduleState}を参照
 */
export const updateWeekDateTimes = (
  weekDateTimes: WeekDateTimes,
  updateDate: WeekDateTime["Date"],
  updateTime: WeekDateTime["Time"]
): WeekDateTimes => {
  const updateWeekDateTimes = new Map<
    WeekDateTime["Date"],
    WeekDateTime["Time"]
  >();

  weekDateTimes.forEach((time, date) => {
    if (date === updateDate) {
      updateWeekDateTimes.set(date, updateTime);
    } else {
      updateWeekDateTimes.set(date, time);
    }
  });

  return updateWeekDateTimes;
};
