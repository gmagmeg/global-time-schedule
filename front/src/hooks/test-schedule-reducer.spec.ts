/**
 * schedule-reducerのテスト
 */
import { DateString, toDateString } from "@/library/type-date";
import {
  ScheduleAction,
  ScheduleReducer,
  TimeFormat,
  TimeZoneKey,
  TimeZoneValue,
  TimeZones,
  WeekDateTime,
  WeekDateTimes,
  scheduleState,
  moveToNextMonday,
} from "./schedule-reducer";
import {
  convertWeekTimeZoneTime,
  getInitTimeZone,
  reMappingWeekDateTimes,
} from "./schedule-reducer-function";
import {
  HourNumber,
  MinutesNumber,
  TimeType,
} from "@/src/_day-schedule/type-day-schedule";

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
    {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
    {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
    {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
    {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
    {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
    {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
    {
      hour: 0 as HourNumber,
      minutes: 0 as MinutesNumber,
      type: "AM" as TimeType,
    },
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
    const newWeekDateTimes: WeekDateTimes = new Map();
    newWeekDateTimes.set(toDateString("2024-01-01"), expected);
    newWeekDateTimes.set(toDateString("2024-01-02"), dateTimes[1]);
    newWeekDateTimes.set(toDateString("2024-01-03"), dateTimes[2]);
    newWeekDateTimes.set(toDateString("2024-01-04"), dateTimes[3]);
    newWeekDateTimes.set(toDateString("2024-01-05"), dateTimes[4]);
    newWeekDateTimes.set(toDateString("2024-01-06"), dateTimes[5]);
    newWeekDateTimes.set(toDateString("2024-01-07"), dateTimes[6]);

    // Assert
    expect(newState.weekDateTimes).toEqual(newWeekDateTimes);
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

describe("moveToNextMonday １週間の日付を月曜日始まりに補正する", () => {
  describe("moveToNextMonday 月曜日以外で始まったときは、翌週の月曜日始まりに補正する", () => {
    it.each([
      ["2023-10-30"], // 月曜日
      ["2023-10-31"], // 火曜日
      ["2023-11-01"], // 水曜日
      ["2023-11-02"], // 木曜日
      ["2023-11-03"], // 金曜日
      ["2023-11-04"], // 土曜日
    ])("%sを月曜日に補正する", (baseDate) => {
      // Arrange
      const date = toDateString(baseDate);

      // Act
      const result = moveToNextMonday(date);

      // Assert
      expect(result).toBe("2023-11-06");
    });
  });

  describe("moveToNextMonday 月曜日で始まったときは、翌週の月曜日始まりに補正する", () => {
    it.each([
      ["2023-11-05"], // 月曜日
    ])("%sを月曜日に補正する", (baseDate) => {
      // Arrange
      const date = toDateString(baseDate);

      // Act
      const result = moveToNextMonday(date);

      // Assert
      expect(result).toBe("2023-11-13");
    });
  });
});

describe("日本時間をベースに、UTC+1のタイムゾーンの時間へ変換する", () => {
  it("タイムゾーンの指定が無い場合（初期状態）", () => {
    /**
     * Arrange
     */
    const testTimeZones: TimeZones = new Map();
    testTimeZones.set("first", {
      abb: "UTC",
      full: "Coordinated Universal Time",
      utc: "UTC+0",
    });

    const testWeekTime = new Map<DateString, TimeFormat>() as WeekDateTimes;
    testWeekTime.set(toDateString("2023-12-17"), {
      hour: 12,
      minutes: 0,
      type: "PM",
    });
    testTimeZones.set("second", getInitTimeZone());
    testTimeZones.set("third", getInitTimeZone());

    /**
     * Act
     */
    const dateTime = convertWeekTimeZoneTime(testWeekTime, testTimeZones);

    /**
     * Assert
     */
    expect(dateTime).toEqual([
      {
        first: { hour: 12, minutes: 0, type: "PM" },
        second: { hour: "--", minutes: "--", type: "none" },
        third: { hour: "--", minutes: "--", type: "none" },
      },
    ]);
  });
});

describe("日本時間をベースに、他のタイムゾーン時間へ変換する", () => {
  /**
   * このテストとなる基底となる時間データ
   */
  const baseTime: WeekDateTime["Time"] = {
    hour: 12,
    minutes: 0,
    type: "PM",
  };

  const JSTTimeZone: TimeZoneValue = {
    abb: "JST",
    full: "Japan Standard Time",
    utc: "UTC+9",
  };

  it.each([
    // 同一タイムゾーンでの演算確認
    {
      timeZone: JSTTimeZone.utc,
      expected: baseTime,
    },
    // ＋、ーの組み合わせ
    {
      timeZone: "UTC-4",
      expected: { hour: 11, minutes: 0, type: "PM" },
    },
    // ＋、＋の組み合わせ
    {
      timeZone: "UTC+7",
      expected: { hour: 10, minutes: 0, type: "AM" },
    },
  ])(
    "日本時間をベースに、%sのタイムゾーンの時間へ変換する",
    ({ timeZone, expected }) => {
      /**
       * Arrange
       */
      const weekDateTime: WeekDateTime["Time"] = baseTime;
      const newTimeZoneMap = new Map<TimeZoneKey, TimeZoneValue>();
      newTimeZoneMap.set("first", JSTTimeZone);
      newTimeZoneMap.set("second", {
        abb: timeZone,
        full: "",
        utc: timeZone,
      });
      newTimeZoneMap.set("third", getInitTimeZone());

      const testWeekTime = new Map<DateString, TimeFormat>() as WeekDateTimes;
      testWeekTime.set(toDateString("2023-12-17"), weekDateTime);

      /**
       * Act
       */
      const dateTime = convertWeekTimeZoneTime(testWeekTime, newTimeZoneMap);

      /**
       * Assert
       */
      expect(dateTime).toEqual([
        {
          first: baseTime,
          second: expected,
          third: { hour: "--", minutes: "--", type: "none" },
        },
      ]);
    }
  );
});

describe("EST（米国東部時間）をベースに、他のタイムゾーン時間へ変換する", () => {
  /**
   * このテストとなる基底となる時間データ
   */
  const baseTime: WeekDateTime["Time"] = {
    hour: 10,
    minutes: 0,
    type: "AM",
  };

  const ESTTimeZone: TimeZoneValue = {
    abb: "EST",
    full: "Eastern Standard Time",
    utc: "UTC-5",
  };

  it.each([
    // 同一タイムゾーンでの演算確認
    {
      timeZone: ESTTimeZone.utc,
      expected: baseTime,
    },
    // ー、＋の組み合わせ
    {
      timeZone: "UTC+9",
      expected: { hour: 12, minutes: 0, type: "AM" },
    },
    // ー、ーの組み合わせ
    {
      timeZone: "UTC-8",
      expected: { hour: 7, minutes: 0, type: "AM" },
    },
  ])(
    "EST（米国東部時間）をベースに、%sのタイムゾーンの時間へ変換する",
    ({ timeZone, expected }) => {
      /**
       * Arrange
       */
      const weekDateTime: WeekDateTime["Time"] = baseTime;
      const newTimeZoneMap = new Map<TimeZoneKey, TimeZoneValue>();
      newTimeZoneMap.set("first", ESTTimeZone);
      newTimeZoneMap.set("second", {
        abb: timeZone,
        full: "",
        utc: timeZone,
      });
      newTimeZoneMap.set("third", getInitTimeZone());

      const testWeekTime = new Map<DateString, TimeFormat>() as WeekDateTimes;
      testWeekTime.set(toDateString("2023-12-17"), weekDateTime);

      /**
       * Act
       */
      const dateTime = convertWeekTimeZoneTime(testWeekTime, newTimeZoneMap);

      /**
       * Assert
       */
      expect(dateTime).toEqual([
        {
          first: baseTime,
          second: expected,
          third: { hour: "--", minutes: "--", type: "none" },
        },
      ]);
    }
  );
});
