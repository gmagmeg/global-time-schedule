import { customDayjs } from "@/library/dayjs";
import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { DateString } from "@lib/type-date";

export const DayButton: FC<{ date: DateString; isSelected: boolean }> = ({
  date,
  isSelected,
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
