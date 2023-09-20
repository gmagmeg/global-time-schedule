import { FC, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Input, ChakraProvider } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Calendar } from "@/app/date-edit/calendar";
import { CalendarDate, WeekStartDay } from "@/app/date-edit/types-date-edit";
import { YoubiRadio } from "@app/date-edit/youbi-radio";
import { InputChangeEvent } from "../event-types-alias";
import { adjustNextStartDay } from "@app/date-edit/date-edit-function";

export const DateEdit: FC<{
  currentDate: CalendarDate;
  weekStartDay: WeekStartDay;
}> = ({ currentDate, weekStartDay }) => {
  const oneWeekAgo = dayjs(currentDate).subtract(1, "week");

  // 日付を年月日（曜日）形式に整える
  const formatCalendarDate = (calendarDate: CalendarDate): string => {
    const nextStartDay = adjustNextStartDay(calendarDate, weekStartDay);

    return dayjs(nextStartDay).format("YYYY/MM/DD(ddd)");
  };

  /**
   * @attention
   * カレンダーの日付を変更するときは、
   * setWrapCalendarDate()関数を使ってカレンダーの日付を変更すること。
   * setCalendarDate()関数を使ってはいけない。
   */
  /**
   * @deprecated setCalendarDate
   */
  const [calendarDate, setCalendarDate] = useState<CalendarDate>(
    new Date(currentDate)
  );
  const setWrapCalendarDate = (date: CalendarDate): void => {
    setCalendarDate(adjustNextStartDay(date, weekStartDay));
  }

  const [inputDate, setInputDate] = useState<string>(
    formatCalendarDate(currentDate)
  );

  // カレンダーで日付を選択した時の処理
  const handleSelectedDate = (date: CalendarDate): void => {
    setInputDate(formatCalendarDate(date));
    setWrapCalendarDate(date);
  };

  /**
   * 入力した日付をカレンダーにセットする
   * 入力途中の無効な日付はカレンダーにセットしないで弾く
   */
  const handleInputDate = ({ target }: InputChangeEvent): void => {
    const dateString = target.value;
    setInputDate(dateString);
    if (isNaN(Date.parse(dateString)) || oneWeekAgo > dayjs(dateString)) {
      return;
    }

    setWrapCalendarDate(new Date(dateString));
  };

  // @todo 曜日の選択を受け付けるようにする

  return (
    <ChakraProvider>
      <YoubiRadio youbi={weekStartDay} />
      <Input
        variant="outline"
        placeholder="開始日を入力してください"
        onChange={handleInputDate}
        value={inputDate}
      />
      <Calendar targetDate={calendarDate} onChangeDate={handleSelectedDate} />
    </ChakraProvider>
  );
};
