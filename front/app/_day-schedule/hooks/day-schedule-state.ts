import type {
  MinutesNumber,
  HourNumber,
  TimeType,
  DayScheduleState,
} from "../type-day-schedule";

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
  startDate: "2023-11-12",
  hourOptions: hour12,
  minuteOptions: minutes,
  selectedTime: {
    hour: 0,
    minute: 0,
  },
  timeTypeOptions: timeTypeOptions,
  selectedTimeType: "AM",
};
