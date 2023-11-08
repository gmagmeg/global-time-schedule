import { correctToSunday } from "./global-menu-state";

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
