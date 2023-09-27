export const WEEK_TUPLE = ["月", "火", "水", "木", "金", "土", "日"] as const;
export type WeekTuple = typeof WEEK_TUPLE;
export type WeekString = (typeof WEEK_TUPLE)[number];
