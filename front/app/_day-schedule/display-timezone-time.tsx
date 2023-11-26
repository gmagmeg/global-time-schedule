/**
 * @module _day-schedule
 */

import { toTimeZoneTime } from "@/library/dayjs";
import { DateString } from "@/library/type-date";
import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { DayScheduleState } from "./hooks/day-schedule-state";

export const DisplayTimezoneTime: FC<{
  baseDate: DateString;
  selectedTime: DayScheduleState["selectedTime"];
  timeZones: DayScheduleState["timeZones"];
}> = ({ baseDate, timeZones, selectedTime }) => {
  const formattedDateTime = toTimeZoneTime(
    baseDate,
    selectedTime,
    timeZones[0].timeZone,
    timeZones[0].timeZone,
  );

  return (
    <>
      <Text>
        {baseDate === "" && "--:-- -- --"}
        {baseDate !== "" && formattedDateTime}
      </Text>
    </>
  );
};
