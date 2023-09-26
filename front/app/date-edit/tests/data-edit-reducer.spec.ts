import {
  dateEditReducer,
  State,
  DateEditAction,
} from "@app/date-edit/date-edit-reducer";

describe("dateEditReducer", () => {
  const initialState: State = {
    inputDate: "",
    calendarDate: new Date("2022-01-02T00:00:00"),
    weekStartDay: "Sun",
  };

  describe("SET_SELECTED_DATEのケース", () => {
    it("選択された日付を元に、入力日とカレンダーの日付を補正する", () => {
      /**
       * Arrange
       */
      // 曜日の変更は起こらないため、デフォルト値をそのまま使う
      const action: DateEditAction = {
        type: "SET_SELECTED_DATE",
        date: new Date("2022-01-01T00:00:00"),
      };

      const expectedState: State = {
        ...initialState,
        inputDate: "2022/01/02(Sun)",
      };

      /**
       * Act
       */
      const result = dateEditReducer(initialState, action);

      /**
       * Assert
       */
      expect(result).toEqual(expectedState);
    });
  });

  describe("SET_INPUT_DATEのケース", () => {
    it("入力値が日付として有効なフォーマットの場合、直近の次の日曜日の日付に補正する", () => {
      /**
       * Arrange
       */
      // 入力値
      const action: DateEditAction = {
        type: "SET_INPUT_DATE",
        inputDate: "2023/10/10",
      };

      // 期待値
      const expectedState: State = {
        inputDate: "2023/10/10",
        calendarDate: new Date("2023-10-15T00:00:00"),
        weekStartDay: "Sun",
      };

      /**
       * Act
       */
      const result = dateEditReducer(initialState, action);

      /**
       * Assert
       */
      expect(result).toEqual(expectedState);
    });
  });
});
