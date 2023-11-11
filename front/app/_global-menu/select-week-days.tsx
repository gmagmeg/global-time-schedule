import { Button, SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import { DateString } from "./type-global-menu";
import { customDayjs, CustomDayjs } from "@lib/dayjs";

export const SelectWeekDays: FC<{ 
  baseDate: DateString,
  selectedDate: DateString,
 }> = ({ baseDate, selectedDate }) => {
  // 1週間分の日付を格納する配列
  const weekRange = (day: DateString): CustomDayjs[] => {
    const baseDate = customDayjs(day);
    const array = [];
    for (let i = 0; i <= 6; i++) {
      array.push(baseDate.add(i, "day"));
    }

    return array;
  };

  const colorScheme = {
    colorScheme: "gray",
    color: "GrayText",
  };

  const selectedColorScheme = {
    colorScheme: "purple",
    color: "White",
  };

  return (
    <SimpleGrid minChildWidth="1rem" spacing="40px" p={2}>
      {weekRange(baseDate).map((date, index) => {
        const isSelected = customDayjs(selectedDate).isSame(date, 'day');
        const buttonColorScheme = isSelected ? selectedColorScheme : colorScheme;

        return (
          <Button
            w={"5rem"}
            h={"3rem"}
            colorScheme={buttonColorScheme.colorScheme}
            color={buttonColorScheme.color}
            key={index}
          >
            {date.format("ddd")}
            <br />
            {date.format("D")}
          </Button>
          
        );
      })}
    </SimpleGrid>
  );
};
