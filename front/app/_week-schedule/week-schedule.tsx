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
import { TimeZoneAction } from "@/hooks/time-zone-reducer";
import { SelectHourMinutes } from "./select-hour-minutes";

export const WeekSchedule: FC<{ weekStartDate: DateString, handleChangeWeekStartDate: (weekStartDate: DateString) => void; timeZoneDispatch: (action: TimeZoneAction) => void; }> = ({
  weekStartDate,
  handleChangeWeekStartDate,
  timeZoneDispatch
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
            onClick={() => handleChangeWeekStartDate}
            _hover={{
              backgroundColor: "#D7D5F0",
            }}
          >
            <DayButton
              date={date}
              isSelected={isSelectedDate(weekStartDate)}
              onClick={() => handleChangeWeekStartDate}
            />
            <Spacer maxW={4} />
            {
              /**
               * @todo 多分DayScheduleコンポーネントのほうにCopyButtonを移動したほうがよさそう
               * コンテンツコピーするのが難しそう
               */
            }
            <SelectHourMinutes
              selectedTime={"2023-12-30T12:00:00"}
              timeZoneDispatch={timeZoneDispatch}
            />
            <DaySchedule />
            <Box mr={8}>
              <CopyButton />
            </Box>
          </Flex>
        );
      })}
    </>
  );
};
