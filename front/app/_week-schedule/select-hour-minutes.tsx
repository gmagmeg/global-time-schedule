/**
 * @module _day-schedule
 */

import { Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { HourNumber, HourOrMinutes } from "../_day-schedule/type-day-schedule";
import { DateTimeString } from "@/library/type-date";
import { TimeZoneAction } from "@/hooks/time-zone-reducer";
import { SelectAmPmAll } from "./select-am-pm-all";

export const SelectHourMinutes: FC<{
  selectedTime: DateTimeString|string;
  timeZoneDispatch: (action: TimeZoneAction) => void;
}> = ({ selectedTime, timeZoneDispatch }) => {
  
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
  }

  /**
   * 0から12までの時間を扱う
   */
  const hour12: HourNumber[] = Array.from(
    { length: 13 },
    (_, index) => index as HourNumber
  );
  /**
   * 0から24までの時間を扱う
   */
  const hour24: HourNumber[] = Array.from(
    { length: 25 },
    (_, index) => index as HourNumber
  );

  /**
   * 分のセレクトボックスの値が変更された時の処理
   */
  const onChangeMinutes = (nextValue: string) => {
    const minutes = Number(nextValue) as HourOrMinutes;
  }

  const onChangeTimeType = (nextValue: string) => {
  }

  return (
    <>
      <Select
        onChange={(e) => onChangeHour(e.target.value)}
        value={"10"}
        {...commonSelectStyles}
      >
        {hour12.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
      <Text mx={2}>:</Text>
      <Select
        onChange={(e) => onChangeMinutes(e.target.value)}
        value={"30"}
        {...commonSelectStyles}
      >
        {["00", "30"].map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
    
      <SelectAmPmAll
        selectedTimeType={"AM"}
        handleChange={() => {}}
      />
    </>
  );
};
