import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { FC, useReducer } from "react";
import { SelectAmPmAll } from "./select-am-pm-all";
import { timeTypeOptions } from "./hooks/day-schedule-state";
import { dayScheduleState } from "./hooks/day-schedule-state";
import { DayScheduleState } from "./type-day-schedule";
import { DayButton } from "../_common-button/day-button";
import { CopyButton } from "../_common-button/copy-button";
import { SelectHourMinutes } from "./select-hour-minutes";
import { DisplayTimezoneTime } from "./display-timezone-time";
import { DayScheduleReducer } from "./hooks/day-schedule-reducer";

export const DaySchedule: FC<DayScheduleState> = ({
  hourOptions,
  minuteOptions,
  selectedTime,
}) => {
  const [state, dispatch] = useReducer(DayScheduleReducer, dayScheduleState);

  return (
    <>
      <Flex alignItems={"baseline"}>
        <DayButton date={dayScheduleState.startDate} isSelected={true} />
        <Spacer maxW={4} />
        <SelectHourMinutes
          handleChange={dispatch}
          selectedTime={state.selectedTime.hour}
          selectTimeList={hourOptions}
          placeholder={hourOptions[0].toString()}
        />
        <Text mx={2}>:</Text>
        <SelectHourMinutes
          handleChange={dispatch}
          selectedTime={state.selectedTime.minute}
          selectTimeList={minuteOptions}
          placeholder={minuteOptions[0].toString()}
        />
        <Spacer maxW={4} />
        <SelectAmPmAll
          timeTypeOptions={timeTypeOptions}
          selectedTimeType={timeTypeOptions[0]}
        />
        <Spacer h={12} mx={4} borderRight={"1px"} />
        <Box>
          <CopyButton enableCopy={true} />
        </Box>
        <DisplayTimezoneTime 
          displayTime={dayScheduleState.startDate}
          timeZones={dayScheduleState.timeZones}
        />
      </Flex>
    </>
  );
};
