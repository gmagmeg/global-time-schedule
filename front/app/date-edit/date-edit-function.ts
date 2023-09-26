import dayjs, { Dayjs } from "dayjs";
import {
  BaseWeekDays,
  WeekStartDay,
  CalendarDate,
} from "@app/date-edit/types-date-edit";

// 受け取った日付をベースに、指定された次の週の開始日に補正して返す
export const adjustNextStartDay = (
  date: Date,
  weekStartDay: WeekStartDay
): Date => {
  const day = dayjs(date);

  // 開始日によって、基準となる曜日を変更する
  let baseWeekDays: BaseWeekDays = 7;
  if (weekStartDay === "Sun") {
    baseWeekDays = 7;
  } else if (weekStartDay === "Mon") {
    // 日曜日の場合は、1日後の月曜日を基準とする
    if (day.get("day") === 0) {
      baseWeekDays = 1;
    } else {
      baseWeekDays = 8;
    }
  }

  const diff = baseWeekDays - day.get("day");

  return day.add(diff, "day").toDate();
};

export const toAddYoubiFormat = (
  calendarDate: CalendarDate,
  weekStartDay: WeekStartDay
): string => {
  const nextStartDay = adjustNextStartDay(calendarDate, weekStartDay);
  return dayjs(nextStartDay).format("YYYY/MM/DD(ddd)");
};

// 有効な最小の日付を返す
export const validMinDate = (date: string | Date): Dayjs => {
  return dayjs(date).subtract(1, "week");
};
