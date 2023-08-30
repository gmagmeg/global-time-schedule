import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { Box, Input, Button, ChakraProvider } from '@chakra-ui/react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type CalendarStatus = 'hidden' | 'display';

export const ScheduleCalender = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [calenderStatus, setCalenderStatus] = useState<CalendarStatus>('hidden');

  // カレンダーの表示・非表示を切り替える
  const onChangeDate = () => {
    if (calenderStatus === 'hidden') {
      setCalenderStatus('display');
    } else {
      setCalenderStatus('hidden');
    }
  }

  const calendar = () => {
    if (calenderStatus === 'hidden') {
      return <></>;
    } else {
      return <Calendar
        onChange={onChange}
        value={value}
        calendarType='hebrew'
      />
    }
  };

  return (
    <ChakraProvider>
        <Box>
          <Input variant='outline' placeholder='開始日を選択してください' />
          <Button
            onClick={onChangeDate}
          >開始日</Button>
          {calendar()}
        </Box>
    </ChakraProvider>
  );
}