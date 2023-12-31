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
import {
  ScheduleAction,
  WeekDateTime,
  WeekDateTimes,
} from "../schedule/hooks/schedule-reducer";
import { toKeyArray } from "@/library/common";

export const WeekSchedule: FC<{
  weekStartDate: DateString;
  weekDateTimes: WeekDateTimes;
  handleChangeWeekStartDate: (weekStartDate: DateString) => void;
  scheduleDispatch: (action: ScheduleAction) => void;
}> = ({
  weekStartDate,
  weekDateTimes,
  handleChangeWeekStartDate,
  scheduleDispatch,
}) => {
  const isSelectedDate = (targetDate: DateString): boolean => {
    return weekStartDate === targetDate;
  };

  const getTime = (date: WeekDateTime["Date"]): WeekDateTime["Time"] => {
    const result = weekDateTimes.get(date);
    if (!result) {
      throw new Error("時間が取得できませんでした");
    }

    return result;
  };

  const handleUpdateWeekDateTime = (
    updateDate: WeekDateTime["Date"],
    updateTime: WeekDateTime["Time"]
  ): void => {
    scheduleDispatch({
      type: "UPDATE_HOUR_MINUTES",
      updateDate: updateDate,
      updateTime: updateTime,
    });
  };

  return (
    <>
      {toKeyArray(weekDateTimes).map((date) => {
        return (
          <Flex
            key={date}
            p={4}
            align={"center"}
            _hover={{
              backgroundColor: "#D7D5F0",
            }}
          >
            <DayButton
              date={date}
              isSelected={isSelectedDate(weekStartDate)}
              onClick={() => {}}
            />
            <Spacer maxW={4} />
            <DaySchedule
              time={getTime(date)}
              updateDate={date}
              handleUpdateWeekDateTime={handleUpdateWeekDateTime}
            />
            {/**
             * @todo 多分DayScheduleコンポーネントのほうにCopyButtonを移動したほうがよさそう
             * コンテンツコピーするのが難しそう
             */}
            <Box mr={8}>
              <CopyButton />
            </Box>
          </Flex>
        );
      })}
    </>
  );
};
