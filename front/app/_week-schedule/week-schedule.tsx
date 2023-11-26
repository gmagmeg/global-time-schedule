/**
 * @module _week-schedule
 */

import { FC, useReducer } from "react";
import { DaySchedule } from "../_day-schedule/day-schedule";
import {
  weekScheduleState,
  weekScheduleReducer,
} from "./hooks/week-schedule-reducer";
import { createWeekRange } from "@/library/dayjs";
import { DateString } from "@/library/type-date";
import { Box } from "@chakra-ui/react";

export const WeekSchedule: FC<{ startDate: DateString }> = ({
  startDate = "2023-11-26",
}) => {
  const [state, dispatch] = useReducer(weekScheduleReducer, weekScheduleState);

  const weekRange = createWeekRange(startDate);
  const isSelectedDate = (targetDate: DateString): boolean => {
    return state.selectedDate === targetDate;
  };

  const handleClickDayButton = (clickDate: DateString): void => {
    dispatch({
      type: "CLICK_DATE_BUTTON",
      clickDate,
    });
  };

  return (
    <>
      {weekRange.map((baseDate) => {
        return (
          <Box key={baseDate} mb={5}>
            <DaySchedule
              baseDate={baseDate}
              isSelectedDate={isSelectedDate(baseDate)}
              handleClickDayButton={handleClickDayButton}
            />
          </Box>
        );
      })}
    </>
  );
};
