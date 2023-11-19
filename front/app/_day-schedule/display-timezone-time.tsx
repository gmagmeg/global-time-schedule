import { customDayjs } from "@/library/dayjs";
import { DateString, TimeZone } from "@/library/type-date";
import { Text } from "@chakra-ui/react";
import { FC } from "react";

export const DisplayTimezoneTime: FC<{
  displayTime: DateString;
  timeZone: TimeZone;
}> = ({ displayTime, timeZone }) => {
  const formattedDateTime = customDayjs(displayTime)
    .tz(timeZone)
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
