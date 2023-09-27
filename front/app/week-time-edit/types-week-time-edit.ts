/**
 * 定数と型定義を分けると、定義が分散して煩雑になるので、
 * あえて一ファイルに定義しています
 */
export const WEEK_TUPLE = ["月", "火", "水", "木", "金", "土", "日"] as const;
export type WeekTuple = typeof WEEK_TUPLE;
export type YoubiString = (typeof WEEK_TUPLE)[number];

export const TIME_MEDIUM_TUPLE = ["AM", "PM"] as const;
export type TimeMeridiemTuple = typeof TIME_MEDIUM_TUPLE;
export type TimeMeridiemString = (typeof TIME_MEDIUM_TUPLE)[number];

export const MINUTES = ["00", "30"] as const;
export type MinutesTuple = typeof MINUTES;
export type MinutesString = (typeof MINUTES)[number];

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
export type HalfHourString = (typeof HALF_HOUR_TUPLE)[number];

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
export type FullHourString = (typeof HALF_HOUR_TUPLE)[number];

export type HourTuple = typeof HALF_HOUR_TUPLE | typeof FULL_HOUR_TUPLE;
export type HourString = FullHourString | HalfHourString;
