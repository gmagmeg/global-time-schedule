import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { Box, Input, Button, ChakraProvider } from '@chakra-ui/react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const ScheduleCalender = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <ChakraProvider>
      <Box>
        <Input variant='outline' placeholder='開始日を選択してください' />
        <Button>開始日</Button>
        <Calendar
        onChange={onChange}
        value={value}
        calendarType='hebrew'
          />
      </Box>
    </ChakraProvider>
  );
}