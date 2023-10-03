import { FC, useReducer } from "react";
import "react-calendar/dist/Calendar.css";
import { Input, Flex, FormLabel, FormControl } from "@chakra-ui/react";
import { Calendar } from "@editContents/date-edit/calendar";
import {
  CalendarDate,
  WeekStartDayString,
} from "@editContents/date-edit/types-date-edit";
import { InputChangeEvent } from "@app/event-types-alias";
import {
  toAddYoubiFormat,
  adjustNextStartDay,
} from "@editContents/date-edit/date-edit-function";
import { dateEditReducer } from "@editContents/date-edit/date-edit-reducer";
import { RadioGroupButton } from "@app/util-parts/radio-group-button";

export const DateEdit: FC<{
  currentDate: CalendarDate;
  weekStartDay: WeekStartDayString;
}> = ({ currentDate, weekStartDay }) => {
  const initState = {
    inputDate: toAddYoubiFormat(currentDate, weekStartDay),
    calendarDate: adjustNextStartDay(currentDate, weekStartDay),
    weekStartDay,
  };

  const [state, dateEditDispatch] = useReducer(dateEditReducer, initState);
  const handleSelectedDate = (date: CalendarDate): void => {
    dateEditDispatch({ type: "SET_SELECTED_DATE", date });
  };

  const handleInputDate = ({ target }: InputChangeEvent): void => {
    dateEditDispatch({ type: "SET_INPUT_DATE", inputDate: target.value });
  };

  const handleChangeRadio = (value: WeekStartDayString): void => {
    dateEditDispatch({ type: "SET_WEEK_START_DAY", weekStartDay: value });
  };

  return (
    <Flex direction={"column"}>
      <FormControl>
        <FormLabel>開始日選択</FormLabel>
        <RadioGroupButton
          list={[
            { label: "日曜日始まり", value: "Sun" },
            { label: "月曜日始まり", value: "Mon" },
          ]}
          checked={state.weekStartDay}
          onRadioChange={handleChangeRadio}
          direction="column"
        />
        <Input
          mt={3}
          variant="outline"
          placeholder="開始日を入力してください"
          onChange={handleInputDate}
          value={state.inputDate}
          width={350}
        />
        <Calendar
          targetDate={state.calendarDate}
          onChangeDate={handleSelectedDate}
        />
      </FormControl>
    </Flex>
  );
};
