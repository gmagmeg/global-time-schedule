import { correctToSunday } from "./dayjs";
import { toTimeZoneTime } from "@app/_day-schedule/hooks/day-schedule-reducer";
import { toDateString, toDateTimeString } from "./type-date";

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
      const timeZone = {
        from: {
          abb: "JST",
          full: "Japan Standard Time",
          utc: "UTC+9",
        },
        to: [
          {
            abb: toUTC,
            full: "",
            utc: toUTC,
          },
        ],
        toIndex: 0,
      };

      /**
       * Act
       */
      const dateTime = toDateTimeString("2023-12-17T12:00:00");
      const result = toTimeZoneTime(dateTime, timeZone);

      /**
       * Assert
       */
      expect(result).toBe(expected);
    }
  );
});

describe("GlobalMenuState", () => {
  describe("１週間の日付を日曜日始まりに補正する", () => {
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
      const result = correctToSunday(date);

      // Assert
      expect(result).toEqual("2023-11-05");
    });
  });
});
