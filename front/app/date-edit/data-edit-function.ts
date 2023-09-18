// 受け取った日付を、次の日曜日に補正して返す
const adjustNextSunday = (date: Date): Date => {
  const day = date.getDay();
  const diff = 7 - day;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
};
