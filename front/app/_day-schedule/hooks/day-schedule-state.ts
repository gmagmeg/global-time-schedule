/**
 * @module _day-schedule
 */

import type { DayScheduleState } from "../type-day-schedule";
import { customDayjs } from "@lib/dayjs";

export const dayScheduleState: DayScheduleState = {
  startDate: customDayjs().format("YYYY-MM-DD 00:00"),
  selectedTime: {
    hour: 0,
    minute: 30,
    timeType: "AM",
  },
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
