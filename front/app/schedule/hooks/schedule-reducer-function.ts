import {
  TimeFormat,
  TimeZoneSchedule,
  WeekDateTime,
  WeekDateTimes,
} from "./schedule-reducer";
import { createWeekRange, customDayjs } from "@/library/dayjs";
import { ScheduleState } from "./schedule-reducer";
import {
  HourNumber,
  MinutesNumber,
  TimeType,
  toHourNumber,
  toMinutesNumber,
  toTimeType,
} from "@/app/_day-schedule/type-day-schedule";
import { DateString } from "@/library/type-date";

/**
 * 日付と時間を紐づけ直します
 * 生成される値は{@link ScheduleState.weekDateTimes}を参照
 *
 * 日付と時間の紐づきは要素のindexで管理しているため、
 * 日付と時間の要素数が一致していることが前提です。
 * 日付を再生成するため、元々持っていた時間との紐づきがなくなっているため、このような仕様になっています。
 */
export const reMappingWeekDateTimes = (
  weekStartDate: ScheduleState["weekStartDate"],
  weekDateTimes?: ScheduleState["weekDateTimes"]
): WeekDateTimes => {
  const decideWeekRange = createWeekRange(weekStartDate);
  const times = weekDateTimes
    ? Array.from(weekDateTimes.values()).map((time) => time)
    : [];

  return new Map<WeekDateTime["Date"], WeekDateTime["Time"]>(
    decideWeekRange.map((date, index) => {
      return [
        date as WeekDateTime["Date"],
        {
          hour: times[index]?.hour || 0,
          minutes: times[index]?.minutes || 0,
          type: times[index]?.type || "AM",
        } as WeekDateTime["Time"],
      ];
    })
  );
};

/**
 * 指定した１日だけの時間を更新します。
 * 他の日付の時間は変更しません。
 *
 * 更新後の値は{@link ScheduleState.weekDateTimes}や
 * {@link ./test-schedule-reducer.spec.ts}のテストケースを参照
 */
export const updateWeekDateTimes = (
  weekDateTimes: WeekDateTimes,
  updateDate: WeekDateTime["Date"],
  updateTime: WeekDateTime["Time"]
): WeekDateTimes => {
  const updateWeekDateTimes = new Map<
    WeekDateTime["Date"],
    WeekDateTime["Time"]
  >();

  weekDateTimes.forEach((time, date) => {
    if (date === updateDate) {
      updateWeekDateTimes.set(date, updateTime);
    } else {
      updateWeekDateTimes.set(date, time);
    }
  });

  return updateWeekDateTimes;
};

/**
 * {@link ScheduleState.timezoneSchedule}の初期値を生成します
 */
export const getInitTime = () => {
  return {
    hour: "--" as HourNumber,
    minutes: "--" as MinutesNumber,
    type: "none" as TimeType,
  };
};

export const initTimeZoneSchedule = (): TimeZoneSchedule => {
  const defaultFormat = {
    first: {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
    second: getInitTime(),
    third: getInitTime(),
  };

  return Array(7).fill(defaultFormat) as TimeZoneSchedule;
};

/**
 * 基準日をもとに、それぞれのタイムゾーンに応じた時間に変換する
 * 変換後のフォーマットは{@link ScheduleState.timeZoneSchedule}を参照
 */
export const convertWeekTimeZoneTime = (
  weekDateTime: ScheduleState["weekDateTimes"],
  timeZones: ScheduleState["timeZones"]
): TimeZoneSchedule => {
  const fromUTC = timeZones.get("first")?.utc ?? "none";
  const toSecondUTC = timeZones.get("second")?.utc ?? "none";
  const toThirdUTC = timeZones.get("third")?.utc ?? "none";

  if (fromUTC === "none") {
    throw new Error("タイムゾーンが未定義です");
  }
  const fromUTCNum = _convertUTCNum(fromUTC);

  let secondResult: TimeFormat = getInitTime();
  let thirdResult: TimeFormat = getInitTime();
  let newTimeZoneSchedule = [] as TimeZoneSchedule | [];
  let countIndex = 0;
  weekDateTime.forEach((time: TimeFormat, date: DateString) => {
    if (toSecondUTC !== "none") {
      secondResult = _calculateTimeZoneTime(
        date,
        time,
        fromUTCNum,
        _convertUTCNum(toSecondUTC)
      );
    }
    if (toThirdUTC !== "none") {
      thirdResult = _calculateTimeZoneTime(
        date,
        time,
        fromUTCNum,
        _convertUTCNum(toSecondUTC)
      );
    }

    newTimeZoneSchedule[countIndex] = {
      first: time,
      second: secondResult,
      third: thirdResult,
    };
    countIndex++;
  });

  return newTimeZoneSchedule as TimeZoneSchedule;
};

/**
 * 時間の計算を行うために、UTCの＋、ーの数値部分だけを取得する
 */
// UTC文字列から数値だけを取得する
const _convertUTCNum = (utcString: string): number => {
  const utcNum = Number(utcString.replace("UTC", "").replace(/:\d{2}/, ""));
  return Number(utcNum);
};

const _calculateTimeZoneTime = (
  baseDate: DateString,
  time: TimeFormat,
  from: number,
  to: number
): TimeFormat => {
  let dayjsTimeFormat = "";
  let baseDateTime = "";
  let timeFormat = { h: "HH", m: "mm", t: "" };
  if (time.type === "24h") {
    dayjsTimeFormat = "YYYY-MM-DD HH:mm";
    baseDateTime = `${baseDate} ${time.hour}:${time.minutes}`;
    timeFormat = { h: "HH", m: "mm", t: "" };
  } else {
    dayjsTimeFormat = "YYYY-MM-DD HH:mm A";
    baseDateTime = `${baseDate} ${time.hour}:${time.minutes} ${time.type}`;
    timeFormat = { h: "HH", m: "mm", t: "A" };
  }

  const currentHour = customDayjs(baseDateTime, dayjsTimeFormat).hour();
  const diffHour = currentHour + (from - to);
  const day =
    diffHour <= 0
      ? customDayjs(baseDateTime).add(diffHour, "hour")
      : customDayjs(baseDateTime).subtract(diffHour, "hour");

  return {
    hour: toHourNumber(day.format(timeFormat.h)),
    minutes: toMinutesNumber(day.format(timeFormat.m)),
    type: timeFormat.t === "" ? "none" : toTimeType(day.format(timeFormat.t)),
  };
};
