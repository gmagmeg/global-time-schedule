import type {
  MinutesNumber,
  HourNumber,
  TimeType,
  DayScheduleState,
} from "../type-day-schedule";
import { customDayjs } from "@lib/dayjs";

export const minutes: MinutesNumber[] = [0, 30];
export const hour12: HourNumber[] = Array.from(
  { length: 13 },
  (_, index) => index as HourNumber
);
export const hour24: HourNumber[] = Array.from(
  { length: 25 },
  (_, index) => index as HourNumber
);

export const timeTypeOptions: TimeType[] = ["AM", "PM", "24h"];

export const dayScheduleState: DayScheduleState = {
  startDate: customDayjs().format("YYYY-MM-DD 00:00"),
  hourOptions: hour12,
  minuteOptions: minutes,
  selectedTime: {
    hour: 0,
    minute: 30,
  },
  timeTypeOptions: timeTypeOptions,
  selectedTimeType: "AM",
  timeZones: ["Asia/Tokyo", "America/New_York", "Europe/Paris"],
};
