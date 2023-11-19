import { DayScheduleAction } from "./hooks/day-schedule-reducer";
import { Select } from "@chakra-ui/react";
import { FC } from "react";
import { HourOrMinutes } from "./type-day-schedule";

export const SelectHourMinutes: FC<{
  handleChange: (action: DayScheduleAction) => void;
  selectedTime: HourOrMinutes;
  selectTimeList: HourOrMinutes[];
  placeholder: string;
}> = ({ handleChange, selectedTime, selectTimeList, placeholder = "" }) => {

const onChange = (nextValue: string) => {
  const minutes = Number(nextValue) as HourOrMinutes;
  handleChange({
    type: "CHANGE_MINUTES_SELECT_BOX",
    minutes: minutes,
  });
};

  return (
    <Select
      onChange={(e) => onChange(e.target.value)}
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
