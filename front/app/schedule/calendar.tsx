import { FC } from "react";
import "react-calendar/dist/Calendar.css";
import ReactCalendar, {CalendarProps} from "react-calendar";
import {
  CalendarDate,
  NullableCalendarDate,
  NullableCalendarDateRange,
  CalenderStyle
} from "@app/schedule/types-schedule";

export const Calendar: FC<{
  targetDate: CalendarDate;
  onChangeDate: (date: CalendarDate) => void;
  calendarType?: CalenderStyle;
}> = ({
  targetDate, 
  calendarType = "hebrew",
  onChangeDate,
}) => {
  // 日付を選択した時の処理
  const handleSelectedDate = (
    date: NullableCalendarDate | NullableCalendarDateRange
  ): void => {
    if (Array.isArray(date)) {
      date = date[0];
    }
    const selectDate = date ?? new Date();

    onChangeDate(selectDate);
  };

  return (
    <ReactCalendar
      onChange={handleSelectedDate}
      value={targetDate}
      calendarType={calendarType}
    />
  );
};
