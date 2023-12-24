/**
 * @module schedule
 */

import { TimeZone } from "@/library/type-date";

export type ScheduleState = {
  /**
   * タイムゾーンを表す文字列
   */
  timeZones: TimeZone[];
};

export const scheduleState: ScheduleState = {
  timeZones: ["JST", "UTF"],
};
