import { findTimeZoneValue } from "@/library/mapping-timezone";
import { ScheduleState, TimeZoneAbb, TimeZoneKey } from "./schedule-reducer";

/**
 * タイムゾーンに関する関数を集めています
 */
export const reMappingTimeZone = (
  timeZones: ScheduleState["timeZones"],
  updateTimeZoneKey: TimeZoneKey,
  updateTimeZoneAbb: TimeZoneAbb
): ScheduleState["timeZones"] => {
  const newTimeZoneMap: ScheduleState["timeZones"] = new Map([]);
  timeZones.forEach((value, key) => {
    if (key === updateTimeZoneKey) {
      newTimeZoneMap.set(key, findTimeZoneValue(updateTimeZoneAbb));
    } else if (key === "none") {
      newTimeZoneMap.set(key, value);
    } else {
      newTimeZoneMap.set(key, value);
    }
  });

  return newTimeZoneMap;
};
