import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Input, ChakraProvider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Calendar } from '@app/schedule/calendar';
import { CalendarDate } from '@app/schedule/types-schedule'

export const ScheduleCalendar = () => {
  const [calendarDate, setcalendarDate] = useState<Date>(new Date());
  const [calendarStatus, setcalendarStatus] = useState<"display" | "hidden">('hidden');

  // カレンダーの表示・非表示を切り替える
  const onClickInput = () => {
    if (calendarStatus === 'hidden') {
      setcalendarStatus('display');
    } else {
      setcalendarStatus('hidden');
    }
  }

  // カレンダーで日付を選択した時の処理
  const handleSelectedDate = (date: CalendarDate): void => {
    setcalendarStatus('hidden');
    setcalendarDate(date);
  }

  // カレンダーコンポーネントの表示・非表示
  const calendar = () => {
    if (calendarStatus === 'display') {
      return <Calendar
        onChangeDate={handleSelectedDate}
      />
    }
  };

  return (
    <ChakraProvider>
      <Input
        onClick={onClickInput}
        variant='outline' placeholder='開始日を入力してください'
        value={dayjs(calendarDate).format('YYYY年M月D日')}
      />
      {calendar()}
    </ChakraProvider>
  );
}