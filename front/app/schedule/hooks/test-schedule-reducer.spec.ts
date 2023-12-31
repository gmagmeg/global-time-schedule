/**
 * schedule-reducerのテスト
 */
import { toDateString } from "@/library/type-date";
import {
  ScheduleAction,
  ScheduleReducer,
  WeekDateTimes,
  scheduleState,
} from "./schedule-reducer";
import { reMappingWeekDateTimes } from "./schedule-reducer-function";
import {
  HourNumber,
  MinutesNumber,
  TimeType,
} from "@/app/_day-schedule/type-day-schedule";

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
