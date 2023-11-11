import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/weekday";

dayjs.extend(timezone);

export const customDayjs = dayjs;
export type CustomDayjs = Dayjs;
