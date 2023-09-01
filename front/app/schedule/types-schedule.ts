export type CalendarDate = Date;
export type NullableCalendarDate = CalendarDate | null;
export type NullableCalendarDateRange =
  | NullableCalendarDate
  | [NullableCalendarDate, NullableCalendarDate];
