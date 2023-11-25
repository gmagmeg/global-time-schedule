/**
 * @module _global-menu
 */

import { customDayjs } from "@lib/dayjs";
import { StartDate } from "../type-global-menu";
import { correctToSunday } from "./global-menu-function";

const currentDate = correctToSunday(customDayjs().format("YYYY-MM-DD"));
const selectedStartDate = customDayjs(currentDate).format("MM/DD");

export const createStartDateList = (currentDate: string): StartDate[] => {
  const currentDayjs = customDayjs(currentDate);
  const baseDate =
    currentDayjs.weekday() === 0 ? currentDayjs : currentDayjs.weekday(0);

  return [
    {
      sun: baseDate.subtract(1, "week").format("MM/DD"),
      mon: baseDate.subtract(6, "day").format("MM/DD"),
    },
    {
      sun: baseDate.format("MM/DD"),
      mon: baseDate.add(1, "day").format("MM/DD"),
    },
    {
      sun: baseDate.add(1, "week").format("MM/DD"),
      mon: baseDate.add(8, "day").format("MM/DD"),
    },
  ];
};

export const GlobalMenuState = {
  selectedStartDate,
  startDateList: createStartDateList(currentDate),
};
