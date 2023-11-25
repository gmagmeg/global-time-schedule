/**
 * @module _day-schedule
 */

import { FC } from "react";
import { TimeType } from "./type-day-schedule";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { DayScheduleAction } from "./hooks/day-schedule-reducer";

export const SelectAmPmAll: FC<{
  timeTypeOptions: TimeType[];
  selectedTimeType: TimeType;
  handleChange: (action: DayScheduleAction) => void;
}> = ({ timeTypeOptions, selectedTimeType, handleChange }) => {
  const onChangeTimeType = (nextValue: string) => {
    const timeType = nextValue as TimeType;
    handleChange({
      type: "CHANGE_AM_PM_ALL",
      timeType: timeType,
    });
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
