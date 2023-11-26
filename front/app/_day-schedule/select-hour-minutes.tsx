/**
 * @module _day-schedule
 */

import { DayScheduleAction } from "./hooks/day-schedule-reducer";
import { Select, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { DayScheduleState } from "./hooks/day-schedule-state";
import { HourOrMinutes } from "./type-day-schedule";
import { hour12, hour24, minutes } from "./_day-schedule-function";

export const SelectHourMinutes: FC<{
  selectedTime: DayScheduleState["selectedTime"];
  placeholder: string;
  handleChange: (action: DayScheduleAction) => void;
}> = ({ selectedTime, placeholder = "", handleChange }) => {
  
  /**
   * 時間と分のセレクトボックスの共通スタイル
  */
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

  /**
   * 時間のセレクトボックスの値が変更された時の処理
   */
  const onChangeHour = (nextValue: string) => {
    const hour = Number(nextValue) as HourOrMinutes;
    handleChange({
      type: "CHANGE_HOUR_SELECT_BOX",
      hour: hour,
  })}

  /**
   * 分のセレクトボックスの値が変更された時の処理
   */
  const onChangeMinutes = (nextValue: string) => {
    const minutes = Number(nextValue) as HourOrMinutes;
    handleChange({
      type: "CHANGE_MINUTES_SELECT_BOX",
      minutes: minutes,
  })};

  /**
   * 時間のセレクトボックスの値が変更された時の処理
   */
  const [hourOptions, setHourOptions] = useState(hour12);
  useEffect(() => {
    if (selectedTime.timeType === "24h") {
      setHourOptions(hour24);
    } else {
      setHourOptions(hour12);
    };
  }, [selectedTime.timeType]);

  const minuteOptions = minutes;

  return (
    <>
    <Select
      onChange={(e) => onChangeHour(e.target.value)}
      value={selectedTime.hour}
      {...commonSelectStyles}
    >
      {hourOptions.map((time) => (
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
      {minuteOptions.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </Select>
    </>
  );
};
