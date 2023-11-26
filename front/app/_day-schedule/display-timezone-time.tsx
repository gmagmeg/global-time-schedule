/**
 * @module _day-schedule
 */

import { toTimeZoneTime } from "@/library/dayjs";
import { DateString } from "@/library/type-date";
import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { DayScheduleState } from "./hooks/day-schedule-state";

export const DisplayTimezoneTime: FC<{
  startDate: DateString;
  selectedTime: DayScheduleState["selectedTime"];
  timeZones: DayScheduleState["timeZones"];
}> = ({ startDate, timeZones, selectedTime }) => {
  const formattedDateTime = toTimeZoneTime(
    startDate,
    selectedTime,
    timeZones[0].timeZone,
    timeZones[0].timeZone,
  );

  return (
    <>
      <Text>
        {startDate === "" && "--:-- -- --"}
        {startDate !== "" && formattedDateTime}
      </Text>
    </>
  );
};
