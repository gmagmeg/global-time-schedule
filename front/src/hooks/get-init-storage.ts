import { useCallback, useEffect, useState } from "react";
import {
  TimeTypePattern,
  TimeZoneAbb,
  TimeZoneKey,
  TimeZoneValue,
  TimeZones,
} from "./schedule-reducer";
import { saveTimeTypePattern, saveTimeZones } from "../schedule-repository";
import { initTimeZones } from "./schedule-reducer-function";
import { reMappingTimeZone } from "./time-zone-function";

export const useTimeTypePattern = (
  defaultValue: TimeTypePattern
): [
  timeTypePattern: TimeTypePattern,
  setTimeTypePattern: (timeTypePattern: TimeTypePattern) => void
] => {
  const [timeTypePattern, setInternalTimeTypePattern] = useState(defaultValue);

  // クライアントでの初期レンダリング直後にローカルストレージの設定を反映
  useEffect(() => {
    const storageValue =
      localStorage.getItem("timeTypePattern") ?? ("AM/PM" as TimeTypePattern);
    if (!storageValue) {
      setInternalTimeTypePattern("AM/PM");
    } else if (storageValue !== defaultValue) {
      setInternalTimeTypePattern(storageValue as TimeTypePattern);
    }
  }, []);

  // 外部からのセッター呼び出し時にローカルストレージに値を保存する
  const setTimeTypePattern = useCallback(
    (timeTypePattern: TimeTypePattern) => {
      saveTimeTypePattern(timeTypePattern);
      setInternalTimeTypePattern(timeTypePattern);
    },
    [setInternalTimeTypePattern]
  );

  return [timeTypePattern, setTimeTypePattern];
};

export const useTimeZoneTime = (
  defaultValue: TimeZones
): [
  timeZones: TimeZones,
  setTimeZones: (
    timeZones: TimeZones,
    timeZoneKey: TimeZoneKey,
    timeZoneAbb: TimeZoneAbb
  ) => void
] => {
  const [timeZones, setInternalTimeZones] = useState(defaultValue);

  // クライアントでの初期レンダリング直後にローカルストレージの設定を反映
  useEffect(() => {
    const storageValue = localStorage.getItem("timeZone");
    if (!storageValue) {
      setInternalTimeZones(
        new Map<TimeZoneKey, TimeZoneValue>(initTimeZones())
      );
    } else {
      const parseJson = JSON.parse(storageValue) as [
        TimeZoneKey,
        TimeZoneValue
      ][];
      const _timeZone = new Map<TimeZoneKey, TimeZoneValue>(parseJson);
      if (
        defaultValue.get("first") !== _timeZone.get("first") ||
        defaultValue.get("second") !== _timeZone.get("second") ||
        defaultValue.get("third") !== _timeZone.get("third")
      ) {
        setInternalTimeZones(_timeZone);
      }
    }
  }, []);

  // 外部からのセッター呼び出し時にローカルストレージに値を保存する
  const setTimeZones = useCallback(
    (
      timeZones: TimeZones,
      timeZoneKey: TimeZoneKey,
      timeZoneAbb: TimeZoneAbb
    ) => {
      const newTimeZoneMap = reMappingTimeZone(
        timeZones,
        timeZoneKey,
        timeZoneAbb
      );
      saveTimeZones(timeZones, timeZoneKey, timeZoneAbb);
      setInternalTimeZones(newTimeZoneMap);
    },
    [setInternalTimeZones]
  );

  return [timeZones, setTimeZones];
};
