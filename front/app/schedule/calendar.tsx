import { FC, useState } from "react";
import "react-calendar/dist/Calendar.css";
import ReactCalendar from "react-calendar";
import {
  CalendarDate,
  NullableCalendarDate,
  NullableCalendarDateRange,
} from "@app/schedule/types-schedule";

export const Calendar: FC<{
  onChangeDate: (date: CalendarDate) => void;
}> = ({ onChangeDate }) => {
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  // 日付を選択した時の処理
  const handleSelectedDate = (
    date: NullableCalendarDate | NullableCalendarDateRange
  ): void => {
    if (Array.isArray(date)) {
      date = date[0];
    }
    const selectDate = date ?? new Date();
    setCalendarDate(selectDate);
    onChangeDate(selectDate);
  };

  return (
    <ReactCalendar
      onChange={handleSelectedDate}
      value={calendarDate}
      calendarType="hebrew"
    />
  );
};
