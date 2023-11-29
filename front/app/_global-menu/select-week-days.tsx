/**
 * @module _global-menu
 */

import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import { DateString } from "@lib/type-date";
import { customDayjs, createWeekRange } from "@lib/dayjs";
import { DayButton } from "@app/_common-button/day-button";

export const SelectWeekDays: FC<{
  baseDate: DateString;
  selectedDate: DateString;
}> = ({ baseDate, selectedDate }) => {
  const weekRange = createWeekRange(baseDate);

  return (
    <>
      {weekRange.map((date, index) => {
        const isSelected = customDayjs(selectedDate).isSame(date, "day");
        return (
          <DayButton
            key={index}
            date={date}
            isSelected={isSelected}
            onClick={() => {}}
          />
        );
      })}
    </>
  );
};
