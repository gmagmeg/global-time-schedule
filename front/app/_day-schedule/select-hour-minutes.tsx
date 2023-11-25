/**
 * @module DaySchedule
 */

import { DayScheduleAction } from "./hooks/day-schedule-reducer";
import { Select, Text } from "@chakra-ui/react";
import { FC } from "react";
import { HourOrMinutes, DayScheduleState } from "./type-day-schedule";

export const SelectHourMinutes: FC<{
  selectedTime: DayScheduleState["selectedTime"];
  selectTimeList: DayScheduleState["timesOptions"];
  placeholder: string;
  handleChange: (action: DayScheduleAction) => void;
}> = ({ selectedTime, selectTimeList, placeholder = "", handleChange }) => {

  const onChangeHour = (nextValue: string) => {
    const hour = Number(nextValue) as HourOrMinutes;
    handleChange({
      type: "CHANGE_HOUR_SELECT_BOX",
      hour: hour,
  })}

  const onChangeMinutes = (nextValue: string) => {
    const minutes = Number(nextValue) as HourOrMinutes;
    handleChange({
      type: "CHANGE_MINUTES_SELECT_BOX",
      minutes: minutes,
  })};

  const commonSelectStyles = {
    w: "auto",
    placeholder: "",
    border: "none",
    borderBottom: "1px solid",
    borderRadius: "0",
    _focus: {
      boxShadow: "none",
      borderBottom: "2px solid",
    },
  };

  return (
    <>
    <Select
      onChange={(e) => onChangeHour(e.target.value)}
      value={selectedTime.hour}
      {...commonSelectStyles}
    >
      {selectTimeList.hourOptions.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </Select>
    <Text mx={2}>:</Text>
    <Select
      onChange={(e) => onChangeMinutes(e.target.value)}
      value={selectedTime.minute}
      {...commonSelectStyles}
    >
      {selectTimeList.minuteOptions.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </Select>
    </>
  );
};
