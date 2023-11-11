import { CustomDayjs } from "@/library/dayjs";
import { Button } from "@chakra-ui/react";
import { FC } from "react";

export const DayButton: FC<{ date: CustomDayjs, isSelected: boolean }> = ({ date, isSelected }) => {
  const selectedColorScheme = {
    bgColor: "#C794CF",
    color: "White",
  };


  const colorScheme = {
    bgColor: "#e2e8f0",
    color: "White",
  };


  const buttonColorScheme = isSelected ? selectedColorScheme : colorScheme;

  return (
    <Button
    w={"5rem"}
    h={"3rem"}
    bg={buttonColorScheme.bgColor}
    color={buttonColorScheme.color}
  >
    {date.format("ddd")}
    <br />
    {date.format("D")}
  </Button>);
};

