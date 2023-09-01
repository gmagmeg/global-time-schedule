import { FC, useState } from "react";
import "react-calendar/dist/Calendar.css";
import ReactCalendar from "react-calendar";
import { CalendarDate, NullableCalendarDate, NullableCalendarDateRange } from '@app/schedule/types-schedule';

export const Calendar: FC<{
  onChangeDate: (date: CalendarDate) => void;
}> = ({ onChangeDate }) => {
  const [calendarDate, setCalenderDate] = useState<Date>(new Date());

  // 日付を選択した時の処理
  const handleSelectedDate = (date: NullableCalendarDate | NullableCalendarDateRange): void => {
    if (!date) {
      date = new Date();
    }

    if (Array.isArray(date)) {
      date = date[0] ?? new Date();
    }

    setCalenderDate(date);
    onChangeDate(date);
  };

  return (
    <ReactCalendar
      onChange={handleSelectedDate}
      value={calendarDate}
      calendarType="hebrew"
    />
  );
};
