/**
 * @module _week-schedule
 */

import { FC } from "react";
import { DaySchedule } from "./day-schedule";
import { createWeekRange } from "@lib/dayjs";
import { DateString } from "@lib/type-date";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { DayButton } from "../_common-button/day-button";
import { CopyButton } from "../_common-button/copy-button";

export const WeekSchedule: FC<{ weekStartDate: DateString, handleChangeWeekStartDate: (weekStartDate: DateString) => void;  }> = ({
  weekStartDate,
  handleChangeWeekStartDate
}) => {
  const weekRange = createWeekRange(weekStartDate);
  const isSelectedDate = (targetDate: DateString): boolean => {
    return weekStartDate === targetDate;
  };

  return (
    <>
      {weekRange.map((date) => {
        return (
          <Flex
            key={date}
            p={4}
            align={"center"}
            style={isSelectedDate(date) ? {backgroundColor: "#D7D5F0"} : {}}
            onClick={() => handleChangeWeekStartDate}
          >
            <DayButton
              date={date}
              isSelected={isSelectedDate(weekStartDate)}
              onClick={() => handleChangeWeekStartDate}
            />
            <Spacer maxW={4} />
            {
              /**
               * @todo ここの判定を既存のisSelectDateとは分ける
               */
            }
            <DaySchedule
              isSelectedDate={isSelectedDate(weekStartDate)}
            />
            <Box mr={8}>
              <CopyButton />
            </Box>
          </Flex>
        );
      })}
    </>
  );
};
