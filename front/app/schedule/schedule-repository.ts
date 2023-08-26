/**
 * @module schedule
 */
/**
 * LocalStorageからschedule関連のデータを取得する
 */
import {
  ScheduleState,
  TimeTypePattern,
  TimeZoneKey,
  TimeZoneValue,
  TimeZones,
} from "./hooks/schedule-reducer";
import { initTimeZones } from "./hooks/schedule-reducer-function";
import { scheduleState } from "./hooks/schedule-reducer";

/**
 * {@link scheduleState.timeZones}関連の復元と保存を行います
 */
export const findTimeZones = (): TimeZones => {
  const localTimeZone = localStorage.getItem("timeZone");
  if (!localTimeZone) {
    return new Map<TimeZoneKey, TimeZoneValue>(initTimeZones());
  } else {
    const parseJson = JSON.parse(localTimeZone) as [
      TimeZoneKey,
      TimeZoneValue
    ][];
    return new Map<TimeZoneKey, TimeZoneValue>(parseJson);
  }
};

export const saveTimeZones = (timeZones: TimeZones): void => {
  localStorage.setItem("timeZone", JSON.stringify(Array.from(timeZones)));
};

/**
 * {@link scheduleState.timeTypePattern}関連の復元と保存を行います
 */
export const findTimeTypePattern = (): TimeTypePattern => {
  const localTimeTypePattern = localStorage.getItem("timeTypePattern");
  if (!localTimeTypePattern) {
    return "AM/PM";
  } else {
    return localTimeTypePattern as TimeTypePattern;
  }
};

export const saveTimeTypePattern = (
  timeTypePattern: ScheduleState["timeTypePattern"]
): void => {
  localStorage.setItem("timeTypePattern", timeTypePattern);
};
