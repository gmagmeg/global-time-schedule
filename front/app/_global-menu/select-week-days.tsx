/**
 * @module _global-menu
 */

import { FC } from "react";
import { DateString } from "@lib/type-date";
import { customDayjs } from "@lib/dayjs";
import { DayButton } from "@app/_common-button/day-button";

export const SelectWeekDays: FC<{
  selectedDate: DateString;
  weekRange: DateString[];
}> = ({ selectedDate, weekRange }) => {
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
