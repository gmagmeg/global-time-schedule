/**
 * @module _week-schedule
 */

import { DayHourMinutes } from "./day-hour-minutes";
import { DateString } from "@lib/type-date";
import { Box, Flex, Spacer } from "@chakra-ui/react";
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
  weekDateTimes,
  timeZoneSchedule,
  scheduleDispatch,
}: {
  timeTypePattern: ScheduleState["timeTypePattern"];
  weekDateTimes: ScheduleState["weekDateTimes"];
  timeZoneSchedule: ScheduleState["timeZoneSchedule"];
  scheduleDispatch: (action: ScheduleAction) => void;
}) => {
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
          <Flex key={date} gap={3} align={"flex-start"} mb={4}>
            <DayButton date={date} onClick={() => {}} />
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
            <DaySchedule timeZoneTime={getTimeZoneTime(index)} />
          </Flex>
        );
      })}
    </>
  );
};
