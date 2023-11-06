import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/weekday";
import { StartDate, DateString } from "../type-global-menu";

dayjs.extend(timezone);

// 月～土曜日の日付を日曜日に補正する
export const correctToSunday = (date: DateString): DateString => {
  const now = dayjs(date);
  const nextSunday = now.day(7);
  return nextSunday.format("YYYY-MM-DD");
};

const currentDate = correctToSunday(dayjs().format("YYYY-MM-DD"));

const selectedStartDate = dayjs(currentDate).format("MM/DD");

export const createStartDateList = (currentDate: string): StartDate[] => {
  const currentDayjs = dayjs(currentDate);
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
