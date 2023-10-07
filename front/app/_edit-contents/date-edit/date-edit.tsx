import { FC, useReducer } from "react";
import "react-calendar/dist/Calendar.css";
import {
  Input,
  Flex,
  FormControl,
  RadioGroup,
  Stack,
  Radio,
  Icon,
} from "@chakra-ui/react";
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
import { TbBrandMonday } from "react-icons/tb";
import { BsSun } from "react-icons/bs";

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

  const youbiList = [
    { label: "日曜日始まり", value: "Sun" },
    { label: "月曜日始まり", value: "Mon" },
  ];

  return (
    <FormControl>
      <Flex direction={"row"} alignItems={"top"}>
        <RadioGroup onChange={handleChangeRadio} value={state.weekStartDay}>
          <Stack direction={"row"} alignItems={"center"}>
            <Radio
              key={youbiList[0].value}
              value={youbiList[0].value}
              checked={youbiList[0].value === state.weekStartDay}
            >
              <Icon as={BsSun} mr={2} />
              {youbiList[0].label}
            </Radio>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Radio
              key={youbiList[1].value}
              value={youbiList[1].value}
              checked={youbiList[1].value === state.weekStartDay}
            >
              <Icon as={TbBrandMonday} mr={2} />
              {youbiList[1].label}
            </Radio>
          </Stack>
        </RadioGroup>

        <Flex direction={"column"} ml={4}>
          <Input
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
        </Flex>
      </Flex>
    </FormControl>
  );
};
