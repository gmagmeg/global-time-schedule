import dayjs from "dayjs";
import timezone from "dayjs/plugin/weekday";

dayjs.extend(timezone);

// 初期値
let currentDate = dayjs();
let baseDate =
  currentDate.weekday() === 0 ? currentDate : currentDate.weekday(0);

const selectedDate = baseDate.format("MM/DD");

const startDateList = [
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

export const GlobalMenuState = {
  selectedDate,
  startDateList,
};
