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
  timeZone: DayScheduleState["timeZone"];
}> = ({ baseDate, selectedTime, timeZone }) => {
  const formattedDateTime = toTimeZoneTime(
    baseDate,
    selectedTime,
    timeZone.from,
    timeZone.to[0]
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
