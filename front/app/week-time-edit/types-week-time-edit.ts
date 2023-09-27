/**
 * 定数と型定義を分けると、定義が分散して煩雑になるので、
 * あえて一ファイルに定義しています
 */
export const WEEK_TUPLE = ["月", "火", "水", "木", "金", "土", "日"] as const;
export type WeekTuple = typeof WEEK_TUPLE;
export type YoubiString = (typeof WEEK_TUPLE)[number];
