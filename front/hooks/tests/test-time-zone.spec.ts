import { convertTimeZoneTime } from "../time-zone-function";
import { toDateTimeString } from "@/library/type-date";

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
        to: {
          abb: toUTC,
          full: "",
          utc: toUTC,
        },
      };

      /**
       * Act
       */
      const dateTime = convertTimeZoneTime(
        toDateTimeString("2023-12-17T12:00:00"),
        timeZone.from,
        timeZone.to
      );

      /**
       * Assert
       */
      expect(dateTime).toBe(expected);
    }
  );
});
