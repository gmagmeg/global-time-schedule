import dayjs from "dayjs";

type WeekStartDay = "Sun" | "Mon";
type BaseWeekDays = 1 | 7 | 8;

// 受け取った日付をベースに、指定された次の週の開始日に補正して返す
export const adjustNextStartDay = (
  date: Date,
  weekStartDay: WeekStartDay = "Sun"
): Date => {
  const day = dayjs(date);

  // 開始日によって、基準となる曜日を変更する
  let baseWeekDays: BaseWeekDays = 7;
  if (weekStartDay === "Sun") {
    baseWeekDays = 7;
  } else if (weekStartDay === "Mon") {
    // 日曜日の場合は、1日後の月曜日を基準とする
    if (day.get("day") === 0) {
      baseWeekDays = 1;
    } else {
      baseWeekDays = 8;
    }
  }

  const diff = baseWeekDays - day.get("day");

  return day.add(diff, "day").toDate();
};
