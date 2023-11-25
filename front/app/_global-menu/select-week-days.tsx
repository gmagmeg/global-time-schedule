import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import { DateString } from "@lib/type-date";
import { customDayjs, CustomDayjs } from "@lib/dayjs";
import { DayButton } from "@app/_common-button/day-button";

export const SelectWeekDays: FC<{
  baseDate: DateString;
  selectedDate: DateString;
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

  return (
    <SimpleGrid minChildWidth="1rem" spacing="40px" p={2}>
      {weekRange(baseDate).map((date, index) => {
        const isSelected = customDayjs(selectedDate).isSame(date, "day");
        return <DayButton key={index} date={date.format('YYYY-mm-dd')} isSelected={isSelected} />;
      })}
    </SimpleGrid>
  );
};
