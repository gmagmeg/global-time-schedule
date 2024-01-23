/**
 * @module _week-schedule
 */

import { DayHourMinutes } from "./day-hour-minutes";
import { DateString } from "@lib/type-date";
import { Box, Stack } from "@chakra-ui/react";
import { DayButton } from "../_common-button/day-button";
import {
  ScheduleAction,
  ScheduleState,
  TimeZoneTime,
  WeekDateTime,
} from "../hooks/schedule-reducer";
import { toKeyArray } from "@/library/common";
import { DaySchedule } from "./day-schedule";
import { TimeTypePattern } from "./time-type-pattern";
import { CopyButton } from "../_common-button/copy-button";

export const WeekSchedule = ({
  timeTypePattern,
  weekDateTimes,
  timeZoneSchedule,
  timeZones,
  scheduleDispatch,
  handleClickCopyButton,
}: {
  timeTypePattern: ScheduleState["timeTypePattern"];
  weekDateTimes: ScheduleState["weekDateTimes"];
  timeZoneSchedule: ScheduleState["timeZoneSchedule"];
  timeZones: ScheduleState["timeZones"];
  scheduleDispatch: (action: ScheduleAction) => void;
  handleClickCopyButton: () => string;
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
    <Box
      w={{ md: "100%", base: "" }}
      ml={{ md: "6", base: "" }}
    >
      {toKeyArray(weekDateTimes).map((date: DateString, index: number) => {
        return (
          <Stack direction={{ base: "column", md: "row" }} key={date} mb={4}>
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
            <DaySchedule
              timeZoneTime={getTimeZoneTime(index)}
              timeZones={timeZones}
            />
          {(index === 0 || index === 6) && 
            <CopyButton
              copyText="All Copy"
              width="10em"
              handleClickCopyButton={handleClickCopyButton}
            />
          }
          </Stack>
        );
      })}
    </Box>
  );
};
