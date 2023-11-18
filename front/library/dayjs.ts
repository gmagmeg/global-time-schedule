import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localDate from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localDate);
dayjs.extend(weekday);

export const customDayjs = dayjs;
export type CustomDayjs = Dayjs;
