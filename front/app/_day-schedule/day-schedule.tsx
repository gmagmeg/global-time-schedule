/**
 * @module _day-schedule
 */

import { Box, Flex, Spacer } from "@chakra-ui/react";
import { FC, useReducer } from "react";
import { SelectAmPmAll } from "./select-am-pm-all";
import { dayScheduleState, DayScheduleState } from "./hooks/day-schedule-state";
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
          selectedTime={state.selectedTime}
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
          startDate={dayScheduleState.startDate}
          selectedTime={state.selectedTime}
          timeZones={dayScheduleState.timeZones}
        />
      </Flex>
    </>
  );
};
