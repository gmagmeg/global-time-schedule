import { customDayjs } from "@/library/dayjs";
import { DateString, TimeZone } from "@/library/type-date";
import { Text } from "@chakra-ui/react";
import { FC } from "react";

export const DisplayTimezoneTime: FC<{
  displayTime: DateString;
  timeZones: TimeZone[];
}> = ({ displayTime, timeZones }) => {
  const formattedDateTime = customDayjs(displayTime)
    .tz(timeZones[0])
    .format("hh:mm A [JST]");

  return (
    <>
      <Text>
        {displayTime === "" && "--:-- -- --"}
        {displayTime !== "" && formattedDateTime}
      </Text>
    </>
  );
};
