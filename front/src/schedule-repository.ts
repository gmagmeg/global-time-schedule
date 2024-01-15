/**
 * @module schedule
 */
/**
 * LocalStorageからschedule関連のデータを取得する
 */
import {
  ScheduleState,
  TimeTypePattern,
  TimeZoneAbb,
  TimeZoneKey,
  TimeZoneValue,
  TimeZones,
} from "./hooks/schedule-reducer";
import { initTimeZones } from "./hooks/schedule-reducer-function";
import { scheduleState } from "./hooks/schedule-reducer";
import { reMappingTimeZone } from "./hooks/time-zone-function";

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

/**
 * Reducerで管理している値をLocalStorageに保存しようとすると、
 * 変更前のキャッシュ値が保存されてしまうため、この関数内で再生成しています。
 */
export const saveTimeZones = (
  timeZones: ScheduleState["timeZones"],
  updateTimeZoneKey: TimeZoneKey,
  updateTimeZoneAbb: TimeZoneAbb
): void => {
  const newTimeZones = reMappingTimeZone(
    timeZones,
    updateTimeZoneKey,
    updateTimeZoneAbb
  );
  localStorage.setItem("timeZone", JSON.stringify(Array.from(newTimeZones)));
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
