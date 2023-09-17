import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

export const caluculateLocalTime = (time: string, timezone: string) => {
  return dayjs(time).tz(timezone).format("HH:mm");
};
