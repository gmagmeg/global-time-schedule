/**
 * @module _day-schedule
 */

import { Box, Text } from "@chakra-ui/react";
import {
  TimeZoneKey,
  TimeZones,
  WeekDateTime,
} from "../schedule/hooks/schedule-reducer";
import { convertTimeZoneTime } from "../schedule/hooks/schedule-reducer-function";

export const DaySchedule = ({
  baseDate,
  baseTime,
  timeZones,
}: {
  baseDate: WeekDateTime["Date"];
  baseTime: WeekDateTime["Time"];
  timeZones: TimeZones;
}) => {
  const calculateTime = (timeZoneKey: TimeZoneKey): string => {
    const fromTimeZone = timeZones.get("first");
    const toTimeZone = timeZones.get(timeZoneKey);
    if (!fromTimeZone?.abb || !toTimeZone?.abb) {
      return "--:--";
    }

    return convertTimeZoneTime(baseDate, baseTime, fromTimeZone, toTimeZone);
  };

  const timeZoneKeys: TimeZoneKey[] = ["first", "second", "third"];

  return (
    <Box>
      {timeZoneKeys.map((timeZoneKey) => {
        return <Text key={timeZoneKey}>{calculateTime(timeZoneKey)}</Text>;
      })}
    </Box>
  );
};
