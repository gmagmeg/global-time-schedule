/**
 * @module _week-schedule
 */

import { DaySchedule } from "./day-schedule";
import { DayHourMinutes } from "./day-hour-minutes";
import { DateString } from "@lib/type-date";
import { Flex, Spacer } from "@chakra-ui/react";
import { DayButton } from "../_common-button/day-button";
import { CopyButton } from "../_common-button/copy-button";
import {
  ScheduleAction,
  ScheduleState,
  WeekDateTime,
  WeekDateTimes,
} from "../schedule/hooks/schedule-reducer";
import { toKeyArray } from "@/library/common";

export const WeekSchedule = ({
  weekStartDate,
  weekDateTimes,
  timeZones,
  scheduleDispatch,
}: {
  weekStartDate: DateString;
  weekDateTimes: WeekDateTimes;
  timeZones: ScheduleState["timeZones"];
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
      {toKeyArray(weekDateTimes).map((date: DateString) => {
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
            <DayHourMinutes
              time={getTime(date)}
              updateDate={date}
              handleUpdateWeekDateTime={handleUpdateWeekDateTime}
            />
            <CopyButton width="15%" />
            <Spacer maxW={4} />
            <DaySchedule
              baseDate={date}
              baseTime={getTime(date)}
              timeZones={timeZones}
            />
          </Flex>
        );
      })}
    </>
  );
};
