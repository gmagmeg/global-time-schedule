import { adjustNextStartDay } from "./date-edit-function";
import dayjs from "dayjs";

// adjustNextSundayのユニットテスト
describe("adjustNextSunday", () => {
  describe("開始日が日曜日のパターン", () => {
    test.each`
      inputDate
      ${"2023-9-24"}
    `(
      "開始日が日曜日の場合、$inputDate の週の次の日曜日は 2023/10/1 になる",
      ({ inputDate }) => {
        const date = dayjs(inputDate);
        const expected = dayjs("2023-10-1");
        const actual = adjustNextStartDay(date.toDate(), "Sun");
        expect(actual).toEqual(expected.toDate());
      }
    );
  });

  describe("開始日が月曜日のパターン", () => {
    test.each`
      inputDate
      ${"2023-9-24" /* 日曜日 */}
    `(
      "開始日が月曜日の場合、$inputDate の週の次の月曜日は 2023/9/25 になる",
      ({ inputDate }) => {
        const date = dayjs(inputDate);
        const expected = dayjs("2023-9-25");
        const actual = adjustNextStartDay(date.toDate(), "Mon");
        expect(actual).toEqual(expected.toDate());
      }
    );

    test.each`
      inputDate
      ${"2023-9-18" /* 月曜日 */}
      ${"2023-9-19" /* 火曜日 */}
      ${"2023-9-23" /* 土曜日 */}
    `(
      "開始日が月曜日の場合、$inputDate の週の次の月曜日は 2023/9/25 になる",
      ({ inputDate }) => {
        const date = dayjs(inputDate);
        const expected = dayjs("2023-9-25");
        const actual = adjustNextStartDay(date.toDate(), "Mon");
        expect(actual).toEqual(expected.toDate());
      }
    );
  });

  describe("うるう年のパターン", () => {
    it("日曜日開始のパターン", () => {
      const date = dayjs("2024-2-25");
      const expected = dayjs("2024-3-3");
      const actual = adjustNextStartDay(date.toDate(), "Sun");
      expect(actual).toEqual(expected.toDate());
    });

    it("月曜日開始のパターン", () => {
      const date = dayjs("2024-2-26");
      const expected = dayjs("2024-3-4");
      const actual = adjustNextStartDay(date.toDate(), "Mon");
      expect(actual).toEqual(expected.toDate());
    });
  });
});
