import { customDayjs } from "@/library/dayjs";
import { Text } from "@chakra-ui/react";
import { FC } from "react";


/**
 * @todo TimeZoneの型を作る
 */
export const DisplayTimezoneTime: FC<{ displayTime: string, timeZone: string }> = ({ displayTime, timeZone }) => {
  const formattedDateTime = customDayjs(displayTime).tz('Asia/Tokyo').format('hh:mm A [JST]');

  return (
  <>
  <Text>
  {displayTime === '' && '--:-- -- --'}
  {displayTime !== '' && formattedDateTime}
  </Text>
  </>);
};

