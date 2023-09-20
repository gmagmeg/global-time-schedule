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

export type WeekStartDay = "Sun" | "Mon";
export type BaseWeekDays = 1 | 7 | 8;
