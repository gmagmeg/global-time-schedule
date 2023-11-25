/**
 * @module _day-schedule
 */

import { Box, Flex, Spacer } from "@chakra-ui/react";
import { FC, useReducer } from "react";
import { SelectAmPmAll } from "./select-am-pm-all";
import { dayScheduleState } from "./hooks/day-schedule-state";
import { DayScheduleState } from "./type-day-schedule";
import { DayButton } from "../_common-button/day-button";
import { CopyButton } from "../_common-button/copy-button";
import { SelectHourMinutes } from "./select-hour-minutes";
import { DisplayTimezoneTime } from "./display-timezone-time";
import { DayScheduleReducer } from "./hooks/day-schedule-reducer";

export const DaySchedule: FC<DayScheduleState> = ({
  selectedTime,
}) => {
  const [state, dispatch] = useReducer(DayScheduleReducer, dayScheduleState);

  return (
    <>
      <Flex alignItems={"baseline"}>
        <DayButton date={dayScheduleState.startDate} isSelected={true} />
        <Spacer maxW={4} />
        <SelectHourMinutes
          selectedHour={state.selectedTime.hour}
          selectedMinute={state.selectedTime.minute}
          selectedTimeType={state.selectedTime.timeType}
          placeholder="--:--"
          handleChange={dispatch}
        />
        <Spacer maxW={4} />
        <SelectAmPmAll
          selectedTimeType={state.selectedTime.timeType}
          handleChange={dispatch}
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
