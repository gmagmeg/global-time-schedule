/**
 * schedule-reducerのテスト
 */
import { toDateString } from "@/library/type-date";
import {
  ScheduleAction,
  ScheduleReducer,
  TimeZoneValue,
  WeekDateTime,
  WeekDateTimes,
  scheduleState,
} from "./schedule-reducer";
import {
  convertTimeZoneTime,
  reMappingWeekDateTimes,
} from "./schedule-reducer-function";
import {
  HourNumber,
  MinutesNumber,
  TimeType,
} from "@/app/_day-schedule/type-day-schedule";
import { moveToNextSunday } from "@/hooks/time-zone-function";

describe("reMappingWeekDateTimes", () => {
  it("時間が何も指定されていない場合、１週間分の日付と時間の紐づきを初期化する", () => {
    // Arrange
    const baseDate = toDateString("2023-11-26");

    // Act
    const initState = reMappingWeekDateTimes(baseDate, undefined);

    // Assert
    expect(initState).toEqual(
      new Map([
        ["2023-11-26", { hour: 0, minutes: 0, type: "AM" }],
        ["2023-11-27", { hour: 0, minutes: 0, type: "AM" }],
        ["2023-11-28", { hour: 0, minutes: 0, type: "AM" }],
        ["2023-11-29", { hour: 0, minutes: 0, type: "AM" }],
        ["2023-11-30", { hour: 0, minutes: 0, type: "AM" }],
        ["2023-12-01", { hour: 0, minutes: 0, type: "AM" }],
        ["2023-12-02", { hour: 0, minutes: 0, type: "AM" }],
      ])
    );
  });

  it("時間指定されいる場合、開始日の日付から１週間分の日付に対して、時間を紐づき直す", () => {
    // Arrange
    const dateTimes = [
      { hour: 0, minutes: 0, type: "AM" },
      { hour: 1, minutes: 30, type: "PM" },
      { hour: 2, minutes: 0, type: "24h" },
      { hour: 3, minutes: 30, type: "AM" },
      { hour: 4, minutes: 0, type: "PM" },
      { hour: 5, minutes: 30, type: "24h" },
      { hour: 6, minutes: 0, type: "AM" },
    ];

    const initState = new Map([
      ["2023-01-01", dateTimes[0]],
      ["2023-01-02", dateTimes[1]],
      ["2023-01-03", dateTimes[2]],
      ["2023-01-04", dateTimes[3]],
      ["2023-01-05", dateTimes[4]],
      ["2023-01-06", dateTimes[5]],
      ["2023-01-07", dateTimes[6]],
    ]) as WeekDateTimes;
    const baseDate = toDateString("2023-11-26");

    // Act
    const resultState = reMappingWeekDateTimes(baseDate, initState);

    // Assert
    expect(resultState).toEqual(
      new Map([
        ["2023-11-26", dateTimes[0]],
        ["2023-11-27", dateTimes[1]],
        ["2023-11-28", dateTimes[2]],
        ["2023-11-29", dateTimes[3]],
        ["2023-11-30", dateTimes[4]],
        ["2023-12-01", dateTimes[5]],
        ["2023-12-02", dateTimes[6]],
      ])
    );
  });
});

describe("UPDATE_HOUR_MINUTES", () => {
  /**
   * 共通処理部分
   */
  beforeEach(() => {
    scheduleState.weekDateTimes = reMappingWeekDateTimes(
      toDateString("2024-01-01")
    );
  });

  const dateTimes = [
    { hour: 0, minutes: 0, type: "AM" },
    { hour: 0, minutes: 0, type: "AM" },
    { hour: 0, minutes: 0, type: "AM" },
    { hour: 0, minutes: 0, type: "AM" },
    { hour: 0, minutes: 0, type: "AM" },
    { hour: 0, minutes: 0, type: "AM" },
    { hour: 0, minutes: 0, type: "AM" },
  ];

  it("2024-01-01（先頭）の時間を更新する", () => {
    // Arrange
    const expected = {
      hour: 12 as HourNumber,
      minutes: 30 as MinutesNumber,
      type: "PM" as TimeType,
    };
    const action: ScheduleAction = {
      type: "UPDATE_HOUR_MINUTES",
      updateDate: toDateString("2024-01-01"),
      updateTime: expected,
    };

    // Act
    const newState = ScheduleReducer(scheduleState, action);

    // Assert
    expect(newState.weekDateTimes).toEqual(
      new Map([
        ["2024-01-01", expected],
        ["2024-01-02", dateTimes[1]],
        ["2024-01-03", dateTimes[2]],
        ["2024-01-04", dateTimes[3]],
        ["2024-01-05", dateTimes[4]],
        ["2024-01-06", dateTimes[5]],
        ["2024-01-07", dateTimes[6]],
      ])
    );
  });

  it("2024-01-07（末尾）の時間を更新する", () => {
    // Arrange
    const expected = {
      hour: 12 as HourNumber,
      minutes: 30 as MinutesNumber,
      type: "PM" as TimeType,
    };
    const action: ScheduleAction = {
      type: "UPDATE_HOUR_MINUTES",
      updateDate: toDateString("2024-01-07"),
      updateTime: expected,
    };

    // Act
    const newState = ScheduleReducer(scheduleState, action);

    // Assert
    expect(newState.weekDateTimes).toEqual(
      new Map([
        ["2024-01-01", dateTimes[0]],
        ["2024-01-02", dateTimes[1]],
        ["2024-01-03", dateTimes[2]],
        ["2024-01-04", dateTimes[3]],
        ["2024-01-05", dateTimes[4]],
        ["2024-01-06", dateTimes[5]],
        ["2024-01-07", expected],
      ])
    );
  });
});

describe("moveToNextSunday １週間の日付を日曜日始まりに補正する", () => {
  describe("moveToNextSunday 日曜日以外で始まったときは、翌週の日曜日始まりに補正する", () => {
    it.each([
      ["2023-10-30"], // 月曜日
      ["2023-10-31"], // 火曜日
      ["2023-11-01"], // 水曜日
      ["2023-11-02"], // 木曜日
      ["2023-11-03"], // 金曜日
      ["2023-11-04"], // 土曜日
    ])("%sを日曜日に補正する", (baseDate) => {
      // Arrange
      const date = toDateString(baseDate);

      // Act
      const result = moveToNextSunday(date);

      // Assert
      expect(result).toEqual("2023-11-05");
    });
  });

  describe("moveToNextSunday 日曜日で始まったときは、翌週の日曜日始まりに補正する", () => {
    it.each([
      ["2023-11-05"], // 日曜日
    ])("%sを日曜日に補正する", (baseDate) => {
      // Arrange
      const date = toDateString(baseDate);

      // Act
      const result = moveToNextSunday(date);

      // Assert
      expect(result).toEqual("2023-11-12");
    });
  });
});

describe("日本時間をベースに、他のタイムゾーン時間へ変換する", () => {
  it.each([
    ["UTC+1", "04:00 PM"],
    ["UTC-5", "10:00 AM"],
    ["UTC-8", "07:00 AM"],
  ])(
    "日本時間をベースに、%sのタイムゾーンの時間へ変換する",
    (toUTC, expected) => {
      /**
       * Arrange
       */
      const baseDate: WeekDateTime["Date"] = toDateString("2023-12-17");

      const weekDateTime: WeekDateTime["Time"] = {
        hour: 12,
        minutes: 0,
        type: "PM",
      };

      const fromTimeZone: TimeZoneValue = {
        abb: "JST",
        full: "Japan Standard Time",
        utc: "UTC+9",
      };

      const toTimeZone: TimeZoneValue = {
        abb: toUTC,
        full: "",
        utc: toUTC,
      };

      /**
       * Act
       */
      const dateTime = convertTimeZoneTime(
        baseDate,
        weekDateTime,
        fromTimeZone,
        toTimeZone
      );

      /**
       * Assert
       */
      expect(dateTime).toBe(expected);
    }
  );
});
