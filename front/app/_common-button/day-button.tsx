/**
 * @module _common-button
 */

import { customDayjs } from "@/library/dayjs";
import { Button } from "@chakra-ui/react";
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
      w={"5rem"}
      h={"3rem"}
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
