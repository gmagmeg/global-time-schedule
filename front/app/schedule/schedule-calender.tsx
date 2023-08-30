import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { Box, Input, Button, ChakraProvider } from '@chakra-ui/react';

type CalenderDate = Date | null;
type RangeCalenderDate = [CalenderDate, CalenderDate];
type CalendarStatus = 'hidden' | 'display';

// @todo Dayjsをインポートして、日付のフォーマットを変更する

export const ScheduleCalender = () => {
  const [calenderDate, setCalenderDate] = useState<Date>(new Date());
  const [calenderStatus, setCalenderStatus] = useState<CalendarStatus>('hidden');

  // カレンダーの表示・非表示を切り替える
  const onChangeDate = () => {
    if (calenderStatus === 'hidden') {
      setCalenderStatus('display');
    } else {
      setCalenderStatus('hidden');
    }
  }

  // カレンダーで日付を選択した時の処理
  const onSelectedDate = (date: CalenderDate | RangeCalenderDate) => {
    if (!date) {
      date = new Date();
    }

    if (Array.isArray(date)) {
      date = date[0] ?? new Date();
    }

    setCalenderDate(date);
    setCalenderStatus('hidden');
  }

  // カレンダーコンポーネントの表示・非表示
  const calendar = () => {

    if (calenderStatus === 'hidden') {
      return <></>;
    } else {
      return <Calendar
        onChange={onSelectedDate}
        value={calenderDate}
        calendarType='hebrew'
      />
    }
  };

  return (
    <ChakraProvider>
        <Box>
          <Input
            onClick={onChangeDate}
            variant='outline' placeholder='開始日を入力してください'
            value={calenderDate.toDateString()}
          />
          {calendar()}
        </Box>
    </ChakraProvider>
  );
}