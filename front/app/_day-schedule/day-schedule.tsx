/**
 * @module _day-schedule
 */

import { Box, Flex, Spacer } from "@chakra-ui/react";
import { FC, useReducer } from "react";
import { SelectAmPmAll } from "./select-am-pm-all";
import { dayScheduleState } from "./hooks/day-schedule-state";
import { DayButton } from "../_common-button/day-button";
import { CopyButton } from "../_common-button/copy-button";
import { SelectHourMinutes } from "./select-hour-minutes";
import { DisplayTimezoneTime } from "./display-timezone-time";
import { DayScheduleReducer } from "./hooks/day-schedule-reducer";
import { DateString } from "@/library/type-date";

export const DaySchedule: FC<{
  baseDate: DateString,
  isSelectedDate: boolean,
  handleClickDayButton: (clickDate: DateString) => void,
}> = ({
  baseDate,
  isSelectedDate,
  handleClickDayButton
}) => {
  const [state, dispatch] = useReducer(DayScheduleReducer, dayScheduleState);

  const onClickDayButton = (): void => {
    handleClickDayButton(baseDate);
  };

  let selectedBackground = {};
  let addStyle = {}
  if (isSelectedDate) {
    selectedBackground = {
      bg: "#C794CF",
      alignItems: "White",
    };

    addStyle = {
      borderRadius: '8px',
    }
  }


  return (
    <>
      <Flex {...selectedBackground} style={ addStyle}>
        <DayButton date={baseDate} isSelected={isSelectedDate} onClick={onClickDayButton} />
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
          baseDate={baseDate}
          selectedTime={state.selectedTime}
          timeZones={dayScheduleState.timeZones}
        />
        <DisplayTimezoneTime
          baseDate={baseDate}
          selectedTime={state.selectedTime}
          timeZones={dayScheduleState.timeZones}
        />
        <DisplayTimezoneTime
          baseDate={baseDate}
          selectedTime={state.selectedTime}
          timeZones={dayScheduleState.timeZones}
        />
      </Flex>
    </>
  );
};
