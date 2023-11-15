import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { FC } from "react";
import { SelectAmPmAll } from "./select-am-pm-all";
import { timeTypeOptions } from "./hooks/day-schedule-state";
import { dayScheduleState } from "./hooks/day-schedule-state";
import { DayScheduleState } from "./type-day-schedule";
import { DayButton } from "../_common-button/day-button";
import { CopyButton } from "../_common-button/copy-button";

export const DaySchedule: FC<DayScheduleState> = ({
  hourOptions,
  minuteOptions,
  selectedTime,
}) => {
  return (
    <>
      <Flex alignItems={"baseline"}>
        <DayButton date={dayScheduleState.startDate} isSelected={true} />
        <Select
          value={selectedTime.hour}
          placeholder={hourOptions[0].toString()}
          border="none"
          borderBottom="1px solid"
          borderRadius="0"
          _focus={{
            boxShadow: "none",
            borderBottom: "2px solid",
          }}
        >
          {hourOptions.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </Select>
        <Text mx={2}>:</Text>
        <Select
          value={selectedTime.minute}
          placeholder={minuteOptions[0].toString()}
          border="none"
          borderBottom="1px solid"
          borderRadius="0"
          _focus={{
            boxShadow: "none",
            borderBottom: "2px solid",
          }}
        >
          {minuteOptions.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </Select>
        <SelectAmPmAll
          timeTypeOptions={timeTypeOptions}
          selectedTimeType={timeTypeOptions[0]}
        />
        <Box mt={2} borderRight={"2px"}>
          &nbsp;
        </Box>
        <CopyButton enableCopy={true} />
      </Flex>
    </>
  );
};
