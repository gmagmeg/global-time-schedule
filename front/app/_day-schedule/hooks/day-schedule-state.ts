/**
 * @module DaySchedule
 */

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
  timesOptions: {
    hourOptions: hour12,
    minuteOptions: minutes,
  },
  selectedTime: {
    hour: 0,
    minute: 30,
    timeType: "AM",
  },
  timeTypeOptions: timeTypeOptions,
  timeZones: [
    {
      timeZone: "Asia/Tokyo",
      timeZoneTime: "09-01 AM",
    },
    {
      timeZone: "America/New_York",
      timeZoneTime: "09-01 AM",
    },
    {
      timeZone: "Europe/Paris",
      timeZoneTime: "09-01 AM",
    },
  ],
};
