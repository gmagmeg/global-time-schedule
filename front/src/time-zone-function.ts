import { findTimeZoneValue } from "@/library/mapping-timezone";
import {
  ScheduleState,
  TimeZoneAbb,
  TimeZoneKey,
  TimeZoneTime,
} from "./hooks/schedule-reducer";
import { getTimeZoneValue } from "./hooks/schedule-reducer-function";

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

/**
 * スケジュール関連のデータをクリップボードにコピーするために
 * 文字列に変換します
 */
export const toCopyFormatText = (
  timeZoneSchedule: ScheduleState["timeZoneSchedule"],
  timeZones: ScheduleState["timeZones"]
): string => {
  const validSchedule = timeZoneSchedule.map((timeZoneTime: TimeZoneTime) => {
    return joinTimeZoneTime([
      dateFormat(timeZoneTime, "first", timeZones),
      dateFormat(timeZoneTime, "second", timeZones),
      dateFormat(timeZoneTime, "third", timeZones),
    ]);
  });

  return validSchedule.join("\n");
};

export const joinTimeZoneTime = (timeZoneStrings: string[]): string => {
  return timeZoneStrings
    .filter((copiedText) => copiedText !== "--:--")
    .join(", ")
    .replace("(24h)", "");
};

export const dateFormat = (
  timeZoneTime: TimeZoneTime,
  key: TimeZoneKey,
  timeZones: ScheduleState["timeZones"]
): string => {
  if (key === "none" || timeZoneTime[key].type === "none") {
    return "--:--";
  }
  const timeZone = getTimeZoneValue(timeZones, key);
  const dateTime = `${timeZoneTime[key].hour}:${timeZoneTime[key].minutes} ${timeZone.abb}`;

  if (timeZoneTime[key].type === "24h") {
    return dateTime;
  }

  return `${dateTime} ${timeZoneTime[key].type}`;
};
