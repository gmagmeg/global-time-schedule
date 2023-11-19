import { Select } from "@chakra-ui/react";
import { FC } from "react";
import { HourOrMinutes } from "./type-day-schedule";

export const SelectHourMinutes: FC<{
  selectedTime: HourOrMinutes;
  selectTimeList: HourOrMinutes[];
  placeholder: string;
}> = ({ selectedTime, selectTimeList, placeholder = "" }) => {
  return (
    <Select
      value={selectedTime}
      w={"auto"}
      placeholder={placeholder}
      border="none"
      borderBottom="1px solid"
      borderRadius="0"
      _focus={{
        boxShadow: "none",
        borderBottom: "2px solid",
      }}
    >
      {selectTimeList.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </Select>
  );
};
