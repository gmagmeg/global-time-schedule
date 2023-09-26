import { FC, useReducer } from "react";
import "react-calendar/dist/Calendar.css";
import { Input, ChakraProvider } from "@chakra-ui/react";
import { Calendar } from "@/app/date-edit/calendar";
import { CalendarDate, WeekStartDay } from "@/app/date-edit/types-date-edit";
import { YoubiRadio } from "@app/date-edit/youbi-radio";
import { InputChangeEvent } from "../event-types-alias";
import {
  toAddYoubiFormat,
  adjustNextStartDay,
} from "@app/date-edit/date-edit-function";
import { dateEditReducer } from "@app/date-edit/date-edit-reducer";

export const DateEdit: FC<{
  currentDate: CalendarDate;
  weekStartDay: WeekStartDay;
}> = ({ currentDate, weekStartDay }) => {
  const initState = {
    inputDate: toAddYoubiFormat(currentDate, weekStartDay),
    calendarDate: adjustNextStartDay(currentDate, weekStartDay),
    weekStartDay,
  };

  const [state, dispatch] = useReducer(dateEditReducer, initState);
  const handleSelectedDate = (date: CalendarDate): void => {
    dispatch({ type: "SET_SELECTED_DATE", date });
  };

  const handleInputDate = ({ target }: InputChangeEvent): void => {
    dispatch({ type: "SET_INPUT_DATE", inputDate: target.value });
  };

  const handleChangeRadio = (value: WeekStartDay): void => {
    dispatch({ type: "SET_WEEK_START_DAY", weekStartDay: value });
  };

  return (
    <ChakraProvider>
      <YoubiRadio
        onChangeRadio={handleChangeRadio}
        weekStartDay={state.weekStartDay}
      />
      <Input
        variant="outline"
        placeholder="開始日を入力してください"
        onChange={handleInputDate}
        value={state.inputDate}
      />
      <Calendar
        targetDate={state.calendarDate}
        onChangeDate={handleSelectedDate}
      />
    </ChakraProvider>
  );
};
