import {
  TimeFormat,
  TimeZoneKey,
  TimeZoneSchedule,
  TimeZoneTime,
  TimeZoneValue,
  TimeZones,
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
} from "@/src/_day-schedule/type-day-schedule";
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
export const getInitTimeFormat = (): TimeFormat => {
  return {
    hour: "--" as HourNumber,
    minutes: "--" as MinutesNumber,
    type: "none" as TimeType,
  };
};

export const isInitTime = (timeFormat: TimeFormat): boolean => {
  return (
    timeFormat.hour === "--" &&
    timeFormat.minutes === "--" &&
    timeFormat.type === "none"
  );
};

export const initTimeZoneSchedule = (): TimeZoneSchedule => {
  const defaultFormat = {
    first: {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
    second: getInitTimeFormat(),
    third: getInitTimeFormat(),
  };

  return Array(7).fill(defaultFormat) as TimeZoneSchedule;
};

export const getInitTimeZone = (): TimeZoneValue => {
  return { abb: "none", full: "none", utc: "none" };
};

export const initTimeZones = (): TimeZones => {
  return new Map<TimeZoneKey, TimeZoneValue>([
    [
      "first",
      {
        abb: "UTC",
        full: "Coordinated Universal Time",
        utc: "UTC+0",
      },
    ],
    ["second", getInitTimeZone()],
    ["third", getInitTimeZone()],
  ]);
};

export const getTimeZoneValue = (
  timeZones: ScheduleState["timeZones"],
  timeZoneKey: TimeZoneKey
): TimeZoneValue => {
  return timeZones.get(timeZoneKey) ?? getInitTimeZone();
};

/**
 * 基準日をもとに、それぞれのタイムゾーンに応じた時間に変換する
 * 変換後のフォーマットは{@link scheduleState.timeZoneSchedule}を参照
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

  let secondResult: TimeFormat = getInitTimeFormat();
  let thirdResult: TimeFormat = getInitTimeFormat();
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
        _convertUTCNum(toThirdUTC)
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
  fromUTC: number,
  toUTC: number
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
    timeFormat = { h: "hh", m: "mm", t: "A" };
  }

  const baseDateTimeDayJs = customDayjs(baseDateTime, dayjsTimeFormat);

  /**
   * 自国の時間 + 時差(＝求めたい国のUTC) – (自分がいる国のUTC)
   */
  // 自国の時間
  const currentCompanyHour = Number(baseDateTimeDayJs.format("h"));
  // 時差(＝求めたい国のUTC) – (自分がいる国のUTC)
  const diffHour = toUTC - fromUTC;

  const resultDay = baseDateTimeDayJs.add(diffHour, "h");

  return {
    hour: toHourNumber(resultDay.format("hh")),
    minutes: toMinutesNumber(resultDay.format(timeFormat.m)),
    type:
      timeFormat.t === "" ? "none" : toTimeType(resultDay.format(timeFormat.t)),
  };
};

/**
 * timeZoneScheduleのデータをクリップボードにコピーするための文字列に変換する
 * @param timeZoneSchedule
 * @returns
 */
export const toCopiedTextList = (
  timeZoneSchedule: ScheduleState["timeZoneSchedule"]
): string => {
  const validSchedule = timeZoneSchedule.map((time: TimeZoneTime) => {
    const validTimeList = [
      dateFormat(time, "first"),
      dateFormat(time, "second"),
      dateFormat(time, "third"),
    ].filter((copiedText) => {
      return copiedText !== "--:--";
    });

    return validTimeList.join(" ");
  });

  return validSchedule.join("\n");
};

export const dateFormat = (time: TimeZoneTime, key: TimeZoneKey): string => {
  if (key === "none" || time[key].type === "none") {
    return "--:--";
  }

  const dateTime = `${time[key].hour}:${time[key].minutes}`;

  if (time[key].type === "24h") {
    return dateTime;
  }

  return `${dateTime} ${time[key].type}`;
};
