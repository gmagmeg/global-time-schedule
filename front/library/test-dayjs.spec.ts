import { toTimeZoneTime, customDayjs, correctToSunday } from "./dayjs";
import { DayScheduleState } from "@/app/_day-schedule/hooks/day-schedule-state";

describe("toTimeZoneTime", () => {
  beforeAll(() => {});

  afterAll(() => {});

  it("日本時間をベースに、America/New_Yorkへ変換する", () => {
    // Arrange
    const selectedTime: DayScheduleState["selectedTime"] = {
      hour: 8,
      minute: 0,
      timeType: "AM",
    };
    const baseTimeZone = "Asia/Tokyo";
    const convertTimeZone = "America/New_York";

    // Act
    const result = toTimeZoneTime(
      "2023-11-26",
      selectedTime,
      baseTimeZone,
      convertTimeZone
    );

    // Assert
    expect(result).toBe("18:00 PM");
  });

  it("日本時間をベースに、America/New_Yorkへ変換する", () => {
    // Arrange
    const selectedTime: DayScheduleState["selectedTime"] = {
      hour: 9,
      minute: 0,
      timeType: "AM",
    };
    const baseTimeZone = "Asia/Tokyo";
    const convertTimeZone = "America/Edmonton";

    // Act
    const result = toTimeZoneTime(
      "2023-11-26",
      selectedTime,
      baseTimeZone,
      convertTimeZone
    );

    // Assert
    expect(result).toBe("17:00 PM");
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
