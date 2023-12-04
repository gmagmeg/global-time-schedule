/**
 * @module _day-schedule
 */

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { FC, useReducer, useState } from "react";
import { SelectAmPmAll } from "./select-am-pm-all";
import { dayScheduleState } from "./hooks/day-schedule-state";
import { DayButton } from "../_common-button/day-button";
import { CopyButton } from "../_common-button/copy-button";
import { SelectHourMinutes } from "./select-hour-minutes";
import { DayScheduleReducer } from "./hooks/day-schedule-reducer";
import { DateString } from "@/library/type-date";
import { TimeType } from "./type-day-schedule";


export const DaySchedule: FC<{
  baseDate: DateString;
  isSelectedDate: boolean;
  handleClickDayButton: (clickDate: DateString) => void;
}> = ({ baseDate, isSelectedDate, handleClickDayButton }) => {
  const [state, dispatch] = useReducer(DayScheduleReducer, dayScheduleState);

  const onClickDayButton = (): void => {
    handleClickDayButton(baseDate);
  };

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
    <Flex
      p={4}
      align={"center"}
      {...selectedBackground}
      style={addStyle}
      onClick={onClickDayButton}
    >
      <DayButton
        date={baseDate}
        isSelected={isSelectedDate}
        onClick={onClickDayButton}
      />
      <Spacer maxW={4} />
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
      <Box mr={8}>
        <CopyButton enableCopy={true} />
      </Box>
      <Text>{state.displayTimes[0]}</Text>
      <Spacer maxW={8} />
    </Flex>
  );
};
