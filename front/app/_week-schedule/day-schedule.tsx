/**
 * @module _day-schedule
 */

import { Box, Spacer, Text } from "@chakra-ui/react";
import { FC, useReducer } from "react";
import { SelectAmPmAll } from "./select-am-pm-all";
import { dayScheduleState } from "../_day-schedule/hooks/day-schedule-state";
import { SelectHourMinutes } from "./select-hour-minutes";
import { DayScheduleReducer } from "../_day-schedule/hooks/day-schedule-reducer";
import { TimeType } from "../_day-schedule/type-day-schedule";

export const DaySchedule: FC<{
  isSelectedDate: boolean;
}> = ({ isSelectedDate}) => {
  const [state, dispatch] = useReducer(DayScheduleReducer, dayScheduleState);

  /**
   * AM/PMの全選択を変更した時の処理
   */
  const onChangeTimeType = (timeType: TimeType): void => {
    dispatch({
      type: "CHANGE_AM_PM_ALL",
      timeType: timeType,
    });
  };

  /**
   * スタイルの設定
   */
  let selectedBackground = {};
  let addStyle = {};
  if (isSelectedDate) {
    selectedBackground = {
      bg: "#D7D5F0",
    };

    addStyle = {
      borderRadius: "8px",
    };
  }

  return (
    <>
      <SelectHourMinutes
        selectedTime={state.selectedTime}
        timeSelectOption={state.timeSelectOption}
        handleChange={dispatch}
      />
      <Spacer maxW={4} />
      <SelectAmPmAll
        selectedTimeType={state.selectedTime.type}
        handleChange={onChangeTimeType}
      />
      <Box h={10} mx={4} borderRight={"1px"} />

      {state.displayTimes.map((displayTime, index) => (
        <Text key={index} mr={8}>
          {displayTime}
        </Text>
      ))}
    </>
  );
};
