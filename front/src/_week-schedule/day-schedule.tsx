/**
 * @module _day-schedule
 */

import { Flex, Text } from "@chakra-ui/react";
import { ScheduleState, TimeZoneKey, TimeZones } from "../hooks/schedule-reducer";
import { CopyButton } from "../_common-button/copy-button";
import { TimeZoneTime } from "../hooks/schedule-reducer";
import { getTimeZoneValue } from "../hooks/schedule-reducer-function";
import { dateFormat, joinTimeZoneTime } from "../time-zone-function";

export const DaySchedule = ({
  timeZoneTime,
  timeZones
}: {
  timeZoneTime: ScheduleState["timeZoneSchedule"][number];
  timeZones: ScheduleState["timeZones"];
}) => {
  const copiedTextList = [
    dateFormat(timeZoneTime, "first", timeZones),
    dateFormat(timeZoneTime, "second", timeZones),
    dateFormat(timeZoneTime, "third", timeZones),
  ];

  const handleClickCopyButton = (): string => {
    return joinTimeZoneTime(copiedTextList);
  }

  return (
    <>
      <Flex alignItems={"flex-start"} gap={5} mt={1} w={"16.5em"} flexDirection={"row"}>
        {copiedTextList.map((copiedText, index) => {
          return (
            <Text key={index} textAlign={"end"}>
              {copiedText}
            </Text>
          );
        })}
      </Flex>
      <CopyButton width="10%" handleClickCopyButton={handleClickCopyButton} />
    </>
  );
};
