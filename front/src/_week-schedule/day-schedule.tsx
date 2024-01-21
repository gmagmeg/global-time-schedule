/**
 * @module _day-schedule
 */

import { Flex, Text } from "@chakra-ui/react";
import { ScheduleState } from "../hooks/schedule-reducer";
import { CopyButton } from "../_common-button/copy-button";
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
            <Text key={index} textAlign={"end"} w={"6em"}>
              {copiedText}
            </Text>
          );
        })}
      </Flex>
      <CopyButton width="10%" handleClickCopyButton={handleClickCopyButton} />
    </>
  );
};
