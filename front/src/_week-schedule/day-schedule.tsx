/**
 * @module _day-schedule
 */

import { Flex, Text } from "@chakra-ui/react";
import { TimeZoneKey } from "../hooks/schedule-reducer";
import { CopyButton } from "../_common-button/copy-button";
import { TimeZoneTime } from "../hooks/schedule-reducer";

export const DaySchedule = ({
  timeZoneTime,
}: {
  timeZoneTime: TimeZoneTime;
}) => {
  const dateFormat = (time: TimeZoneTime, key: TimeZoneKey): string => {
    if (key === "none" || time[key].type === "none") {
      return "--:--"
    }

    const dateTime = `${time[key].hour}:${time[key].minutes}`;

    if (time[key].type === "24h") {
      return `${dateTime} (24h)`;
    }

    return `${dateTime} ${time[key].type}`;
  };

  const copiedTextList = [
    dateFormat(timeZoneTime, "first"),
    dateFormat(timeZoneTime, "second"),
    dateFormat(timeZoneTime, "third"),
  ];

  const handleClickCopyButton = (): string => {
    return copiedTextList
      .filter((copiedText) => copiedText !== "--:--")
      .join(" ")
      .replace("(24h)", "");
  };

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
