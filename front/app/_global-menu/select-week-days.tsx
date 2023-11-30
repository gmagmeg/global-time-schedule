/**
 * @module _global-menu
 */

import { FC, useState, useEffect } from "react";
import { DateString } from "@lib/type-date";
import { customDayjs, createWeekRange } from "@lib/dayjs";
import { DayButton } from "@app/_common-button/day-button";

export const SelectWeekDays: FC<{
  selectedDate: DateString;
}> = ({ selectedDate }) => {
  const [weekRange, setWeekRange] = useState(createWeekRange(selectedDate));

  useEffect(() => {
    setWeekRange(createWeekRange(selectedDate));
  }, [selectedDate]);

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
