import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

type CalenderDate = Date | null;
type RangeCalenderDate = [CalenderDate, CalenderDate];

export const Calender = () => {
  const [calenderDate, setCalenderDate] = useState<Date>(new Date());

  // カレンダーで日付を選択した時の処理
  const onSelectedDate = (date: CalenderDate | RangeCalenderDate) => {
    if (!date) {
      date = new Date();
    }

    if (Array.isArray(date)) {
      date = date[0] ?? new Date();
    }

    setCalenderDate(date);
  }

  return (
    <Calendar
      onChange={onSelectedDate}
      value={calenderDate}
      calendarType='hebrew'
    />
  );
}