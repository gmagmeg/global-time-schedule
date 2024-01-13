/**
 * @module _common-button
 */

import { customDayjs } from "@/library/dayjs";
import { Button, Text } from "@chakra-ui/react";
import { DateString } from "@lib/type-date";
import { ClickButtonEvent } from "../event-types-alias";

export const DayButton = ({
  date,
}: {
  date: DateString;
  onClick: ClickButtonEvent;
}) => {
  const formatDate = customDayjs(date);
  const bgColor = formatDate.day() === 0 ? "red.400" : "#C794CF";

  return (
    <Button
      size={"sm"}
      h={"50px"}
      w={"50px"}
      bg={bgColor}
      color="White"
      _hover={{ bg: "#C794CF" }}
    >
      {formatDate.format("ddd")}
      <br />
      {formatDate.format("D")}
    </Button>
  );
};
