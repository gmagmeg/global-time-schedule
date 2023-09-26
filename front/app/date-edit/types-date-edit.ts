import { CalendarProps } from "react-calendar";

export type CalendarDate = Date;
export type NullableCalendarDate = CalendarDate | null;
export type NullableCalendarDateRange =
  | NullableCalendarDate
  | [NullableCalendarDate, NullableCalendarDate];

export type CalenderStyle = Exclude<
  CalendarProps["calendarType"],
  "Arabic" | "Hebrew" | "ISO 8601" | "US"
>;

export const WEEK_START_DAY = ["Sun", "Mon"] as const;
export type WeekStartDayList = typeof WEEK_START_DAY;
// 汎用のradioBoxに使うため、string型の定義を追加している
export type WeekStartDayString = (typeof WEEK_START_DAY)[number] | string;
export type BaseWeekDays = 1 | 7 | 8;
