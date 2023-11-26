/**
 * @module _common-button
 */

import { customDayjs } from "@/library/dayjs";
import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { DateString } from "@lib/type-date";
import { ClickButtonEvent } from "../event-types-alias";

export const DayButton: FC<{ date: DateString; isSelected: boolean, onClick: ClickButtonEvent; }> = ({
  date,
  isSelected,
  onClick
}) => {
  const selectedColorScheme = {
    bgColor: "#C794CF",
    color: "White",
  };

  const colorScheme = {
    bgColor: "#e2e8f0",
    color: "White",
  };

  const buttonColorScheme = isSelected ? selectedColorScheme : colorScheme;
  const formatDate = customDayjs(date);

  return (
    <Button
      onClick={onClick}
      w={"5rem"}
      h={"3rem"}
      bg={buttonColorScheme.bgColor}
      color={buttonColorScheme.color}
    >
      {formatDate.format("ddd")}
      <br />
      {formatDate.format("D")}
    </Button>
  );
};
