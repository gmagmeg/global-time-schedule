import { toTimeZoneTime, customDayjs } from "./dayjs";
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
