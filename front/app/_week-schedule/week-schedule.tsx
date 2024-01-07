/**
 * @module _week-schedule
 */

import { DayHourMinutes } from "./day-hour-minutes";
import { DateString } from "@lib/type-date";
import { Box, Flex } from "@chakra-ui/react";
import { DayButton } from "../_common-button/day-button";
import {
  ScheduleAction,
  ScheduleState,
  TimeZoneTime,
  WeekDateTime,
} from "../schedule/hooks/schedule-reducer";
import { toKeyArray } from "@/library/common";
import { DaySchedule } from "./day-schedule";
import { TimeTypePattern } from "./time-type-pattern";

export const WeekSchedule = ({
  timeTypePattern,
  weekStartDate,
  weekDateTimes,
  timeZoneSchedule,
  scheduleDispatch,
}: {
  timeTypePattern: ScheduleState["timeTypePattern"];
  weekStartDate: ScheduleState["weekStartDate"];
  weekDateTimes: ScheduleState["weekDateTimes"];
  timeZoneSchedule: ScheduleState["timeZoneSchedule"];
  scheduleDispatch: (action: ScheduleAction) => void;
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

  const getTimeZoneTime = (index: number): TimeZoneTime => {
    const result = timeZoneSchedule[index];
    if (!result) {
      throw new Error("タイムゾーンが取得できませんでした");
    }

    return result;
  };

  return (
    <>
      {toKeyArray(weekDateTimes).map((date: DateString, index: number) => {
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
            <DayHourMinutes
              time={getTime(date)}
              updateDate={date}
              scheduleDispatch={scheduleDispatch}
            />
            <TimeTypePattern
              time={getTime(date)}
              updateDate={date}
              timeTypePattern={timeTypePattern}
              index={index}
              scheduleDispatch={scheduleDispatch}
            />
            <Box h={10} mx={4} borderRight={"1px"} />
            <DaySchedule timeZoneTime={getTimeZoneTime(index)} />
          </Flex>
        );
      })}
    </>
  );
};
