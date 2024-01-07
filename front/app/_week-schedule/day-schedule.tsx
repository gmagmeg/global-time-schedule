/**
 * @module _day-schedule
 */

import { Flex, Text } from "@chakra-ui/react";
import { TimeZoneKey } from "../schedule/hooks/schedule-reducer";
import { CopyButton } from "../_common-button/copy-button";
import { TimeZoneTime } from "../schedule/hooks/schedule-reducer";

export const DaySchedule = ({
  timeZoneTime,
}: {
  timeZoneTime: TimeZoneTime;
}) => {
  const dateFormat = (time: TimeZoneTime, key: TimeZoneKey): string => {
    const dateTime = `${time[key].hour}:${time[key].minutes}`;

    if (time[key].type === "24h") {
      return dateTime;
    }

    if (time[key].type === "none") {
      return "--:--";
    }

    return `${dateTime} ${time[key].type}`;
  };

  const handleClickCopyButton = (): string => {
    return (
      dateFormat(timeZoneTime, "first") +
      " " +
      dateFormat(timeZoneTime, "second") +
      " " +
      dateFormat(timeZoneTime, "third")
    );
  };

  return (
    <Flex width={"50%"} align={"center"}>
      <CopyButton width="20%" handleClickCopyButton={handleClickCopyButton} />
      <Text ml={6}>{dateFormat(timeZoneTime, "first")}</Text>
      <Text ml={6}>{dateFormat(timeZoneTime, "second")}</Text>
      <Text ml={6}>{dateFormat(timeZoneTime, "third")}</Text>
    </Flex>
  );
};
