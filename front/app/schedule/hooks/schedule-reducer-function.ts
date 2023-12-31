import { WeekDateTime, WeekDateTimes } from "./schedule-reducer";
import { createWeekRange } from "@/library/dayjs";
import { ScheduleState } from "./schedule-reducer";

/**
 * 日付と時間を紐づけ直します
 * 生成される値は{@link ScheduleState}を参照
 *
 * 日付と時間の紐づきは要素のindexで管理しているため、
 * 日付と時間の要素数が一致していることが前提です。
 * 日付を再生成するため、元々持っていた時間との紐づきがなくなっているため、このような仕様になっています。
 */
export const reMappingWeekDateTimes = (
  weekStartDate: ScheduleState["weekStartDate"],
  weekDateTimes?: ScheduleState["weekDateTimes"]
): WeekDateTimes => {
  const decideWeekRange = createWeekRange(weekStartDate);
  const times = weekDateTimes
    ? Array.from(weekDateTimes.values()).map((time) => time)
    : [];

  return new Map<WeekDateTime["Date"], WeekDateTime["Time"]>(
    decideWeekRange.map((date, index) => {
      return [
        date as WeekDateTime["Date"],
        {
          hour: times[index]?.hour || 0,
          minutes: times[index]?.minutes || 0,
          type: times[index]?.type || "AM",
        } as WeekDateTime["Time"],
      ];
    })
  );
};

/**
 * 指定した１日だけの時間を更新します。
 * 他の日付の時間は変更しません。
 *
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
