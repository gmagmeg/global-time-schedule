/**
 * @module _day-schedule
 */

import { FC } from "react";
import { TimeType } from "../_day-schedule/type-day-schedule";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export const SelectAmPmAll: FC<{
  selectedTimeType: TimeType;
  handleChange: (timeType: TimeType) => void;
}> = ({ selectedTimeType, handleChange }) => {
  const timeTypeOptions: TimeType[] = ["AM", "PM", "24h"];

  const onChangeTimeType = (nextValue: string) => {
    const timeType = nextValue as TimeType;
    handleChange(timeType);
  };

  return (
    <RadioGroup
      onChange={(value) => onChangeTimeType(value)}
      defaultValue={selectedTimeType}
    >
      <Stack spacing={4} direction="row">
        {timeTypeOptions.map((timeOption: TimeType) => (
          <Radio key={timeOption} value={timeOption}>
            {timeOption}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
