import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Input, ChakraProvider } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Calendar } from "@app/schedule/calendar";
import { CalendarDate } from "@app/schedule/types-schedule";

export const ScheduleCalendar = () => {
  const [calendarDate, setCalendarDate] = useState<string>("");
  const [calendarStatus, setCalendarStatus] = useState<"display" | "hidden">(
    "hidden"
  );

  // カレンダーの表示・非表示を切り替える
  const handleClickInput = () => {
    if (calendarStatus === "hidden") {
      setCalendarStatus("display");
    } else {
      setCalendarStatus("hidden");
    }
  };

  // カレンダーで日付を選択した時の処理
  const handleSelectedDate = (date: CalendarDate): void => {
    setCalendarStatus("hidden");
    setCalendarDate(dayjs(date).format("YYYY-MM-DD"));
  };

  return (
    <ChakraProvider>
      <Input
        onClick={handleClickInput}
        variant="outline"
        placeholder="開始日を入力してください"
        onChange={(): void => {}}
        value={calendarDate}
      />
      {calendarStatus === "display" && (
        <Calendar onChangeDate={handleSelectedDate} />
      )}
    </ChakraProvider>
  );
};
