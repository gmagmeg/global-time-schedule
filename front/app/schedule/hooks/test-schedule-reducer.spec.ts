/**
 * schedule-reducerのテスト
 */
import { DateString, toDateString } from "@/library/type-date";
import {
  ScheduleAction,
  ScheduleReducer,
  WeekDateTime,
  scheduleState,
} from "./schedule-reducer";
import { initWeekDateTimes } from "./schedule-reducer-function";
import {
  HourNumber,
  MinutesNumber,
  TimeType,
} from "@/app/_day-schedule/type-day-schedule";

it("ScheduleStateの初期生成", () => {
  // Arrange
  const baseDate = toDateString("2023-11-26");

  // Act
  const initState = initWeekDateTimes(baseDate);

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

describe("UPDATE_HOUR_MINUTES", () => {
  /**
   * 共通処理部分
   */
  beforeEach(() => {
    scheduleState.weekDateTimes = initWeekDateTimes(toDateString("2024-01-01"));
  });

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
        ["2024-01-02", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-03", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-04", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-05", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-06", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-07", { hour: 0, minutes: 0, type: "AM" }],
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
        ["2024-01-01", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-02", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-03", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-04", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-05", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-06", { hour: 0, minutes: 0, type: "AM" }],
        ["2024-01-07", expected],
      ])
    );
  });
});
