/**
 * @module _day-schedule
 */

import { Flex, Spacer, Text } from "@chakra-ui/react";
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

  const copiedTextList = [
    dateFormat(timeZoneTime, "first"),
    dateFormat(timeZoneTime, "second"),
    dateFormat(timeZoneTime, "third"),
  ];

  const handleClickCopyButton = (): string => {
    return copiedTextList
      .filter((copiedText) => copiedText !== "--:--")
      .join(" ");
  };

  return (
    <>
      <Flex alignItems={"flex-start"} gap={0} mt={1} flexDirection={"row"}>
        {copiedTextList.map((copiedText, index) => {
          return (
            <Text key={index} w={"4em"} textAlign={"end"}>
              {copiedText}
            </Text>
          );
        })}
      </Flex>
      <CopyButton width="10%" handleClickCopyButton={handleClickCopyButton} />
    </>
  );
};
