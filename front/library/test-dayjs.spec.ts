import { correctToSunday } from "./dayjs";
import {
  HourNumber,
  MinutesNumber,
  TimeType,
} from "@app/_day-schedule/type-day-schedule";
import { toTimeZoneTime } from "@app/_day-schedule/hooks/day-schedule-reducer";
import { dayScheduleState } from "@app/_day-schedule/hooks/day-schedule-state";

describe("toTimeZoneTime", () => {
  beforeAll(() => {});

  afterAll(() => {});

  it("日本時間をベースに、America/New_Yorkへ変換する", () => {
    // Arrange
    const selectedTime = {
      hour: 8 as HourNumber,
      minute: 0 as MinutesNumber,
      type: "AM" as TimeType,
    };
    const timeZone = {
      from: "Asia/Tokyo",
      to: "America/New_York",
    };

    // Act
    const result = toTimeZoneTime(dayScheduleState, timeZone.from, timeZone.to);

    // Assert
    expect(result).toBe("10:00 AM");
  });

  it("日本時間をベースに、America/New_Yorkへ変換する", () => {
    // Arrange
    const selectedTime = {
      hour: 9 as HourNumber,
      minute: 0 as MinutesNumber,
      type: "PM" as TimeType,
    };
    const timeZone = {
      from: "Asia/Tokyo",
      to: "America/New_York",
    };

    // Act
    const result = toTimeZoneTime(dayScheduleState, timeZone.from, timeZone.to);

    // Assert
    expect(result).toBe("10:00 AM");
  });
});

describe("GlobalMenuState", () => {
  describe("correctToSunday", () => {
    it.each([
      ["2023-10-30"], // 月曜日
      ["2023-10-31"], // 火曜日
      ["2023-11-01"], // 水曜日
      ["2023-11-02"], // 木曜日
      ["2023-11-03"], // 金曜日
      ["2023-11-04"], // 土曜日
    ])("%sを日曜日に補正する", (baseDate) => {
      // Arrange
      const date = baseDate;

      // Act
      const result = correctToSunday(date);

      // Assert
      expect(result).toEqual("2023-11-05");
    });
  });
});
