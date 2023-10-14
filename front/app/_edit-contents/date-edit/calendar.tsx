import { FC } from "react";
import "react-calendar/dist/Calendar.css";
import ReactCalendar from "react-calendar";
import {
  CalendarDate,
  NullableCalendarDate,
  NullableCalendarDateRange,
  CalenderStyle,
} from "@editContents/date-edit/types-date-edit";
import { validMinDate } from "@editContents/date-edit/hooks/date-edit-function";

export const Calendar: FC<{
  targetDate: CalendarDate;
  onChangeDate: (date: CalendarDate) => void;
  calendarType?: CalenderStyle;
}> = ({ targetDate, calendarType = "hebrew", onChangeDate }) => {
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

  const minDate = validMinDate(new Date()).toDate();

  const tileDisabled = ({ date }: { date: Date }) => date.getDay() > 1;

  return (
    <ReactCalendar
      onChange={handleSelectedDate}
      value={targetDate}
      calendarType={calendarType}
      minDate={minDate}
      tileDisabled={tileDisabled}
    />
  );
};
