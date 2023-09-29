import { WeekUnion } from "./week-time-edit";

export type TimeSelectBoxPops = {
  targetYoubi: WeekUnion;
  hours: HourTuple;
  selected: {
    hour: HourUnion;
    minutes: MinutesUnion;
  };
  onChangeHour: (youbi: WeekUnion, selectedHour: HourUnion) => void;
  onChangeMinutes: (youbi: WeekUnion, selectedMinutes: MinutesUnion) => void;
};

export const MINUTES = ["00", "30"] as const;
export type MinutesTuple = typeof MINUTES;
export type MinutesUnion = (typeof MINUTES)[number];

export const HOURS_OPTION = ["12", "24"] as const;
export type HoursOption = typeof HOURS_OPTION;
export type HoursOptionUnion = (typeof HOURS_OPTION)[number];

/**
 * 12時間表記の型定義と定数
 * 24時間表記はFULL_HOURSを参照
 */
export const HALF_HOUR_TUPLE = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
] as const;
export type HalfHourUnion = (typeof HALF_HOUR_TUPLE)[number];

/**
 * 24時間表記の型定義と定数
 * 12時間表記はHALF_HOURSを参照
 */
export const FULL_HOUR_TUPLE = [
  ...HALF_HOUR_TUPLE,
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
] as const;
export type FullHourUnion = (typeof HALF_HOUR_TUPLE)[number];

export type HourTuple = typeof HALF_HOUR_TUPLE | typeof FULL_HOUR_TUPLE;
export type HourUnion = FullHourUnion | HalfHourUnion;
