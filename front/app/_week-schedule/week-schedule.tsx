/**
 * @module _week-schedule
 */

import { DayHourMinutes } from "./day-hour-minutes";
import { DateString } from "@lib/type-date";
import { Flex } from "@chakra-ui/react";
import { DayButton } from "../_common-button/day-button";
import {
  ScheduleAction,
  ScheduleState,
  TimeZoneTime,
  WeekDateTime,
} from "../schedule/hooks/schedule-reducer";
import { toKeyArray } from "@/library/common";
import { DaySchedule } from "./day-schedule";

export const WeekSchedule = ({
  weekStartDate,
  weekDateTimes,
  timeZoneSchedule,
  scheduleDispatch,
}: {
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
  }

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
              handleUpdateWeekDateTime={handleUpdateWeekDateTime}
            />
            <DaySchedule timeZoneTime={getTimeZoneTime(index)} />
          </Flex>
        );
      })}
    </>
  );
};
