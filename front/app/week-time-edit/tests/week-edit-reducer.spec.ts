import {
  weekEditReducer,
  StateWeekEditReducer,
} from "@app/week-time-edit/hooks/week-time-reducer";
import {
  FULL_HOUR_TUPLE,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types/time-select-box";
import { HOUR_OPTION } from "@app/week-time-edit/types/hour-option";

describe("weekEditReducer", () => {
  const initialState: StateWeekEditReducer = {
    hourOption: HOUR_OPTION.half,
    hoursSelectOption: HALF_HOUR_TUPLE,
    timeSelectBox: [
      {
        selectedYoubi: "日",
        selectedHour: "00",
        selectedMinutes: "00",
        selectedTimeMeridiem: "AM",
      },
      {
        selectedYoubi: "月",
        selectedHour: "01",
        selectedMinutes: "30",
        selectedTimeMeridiem: "PM",
      },
    ],
  };

  describe("CHANGE-HOUR-OPTION 12、24の時間の表示形式を切り替えたとき", () => {
    test.each`
      hourOption | hoursSelectOption
      ${"12"}    | ${HALF_HOUR_TUPLE}
      ${"24"}    | ${FULL_HOUR_TUPLE}
    `(
      `$hourOption が選択されている場合、対応したオプションになる`,
      ({ hourOption, hoursSelectOption }) => {
        /**
         * Arrange
         */
        const expectedState: StateWeekEditReducer = {
          ...initialState,
          hourOption,
          hoursSelectOption,
        };

        /**
         * Act
         */
        const result = weekEditReducer(initialState, {
          type: "CHANGE-HOUR-OPTION",
          hourOption,
        });

        /**
         * Assert
         */
        expect(result).toEqual(expectedState);
      }
    );
  });

  describe("CHANGE-TIME-HOUR　各曜日の時間のセレクトボックスを切り替えたとき", () => {
    test.each`
      targetYoubi | changedHour
      ${"日"}     | ${"05"}
      ${"月"}     | ${"10"}
    `(
      `$targetYoubiの「時」を$changedHourに変更する`,
      ({ targetYoubi, changedHour }) => {
        /**
         * Arrange
         */
        const expectedState = {
          ...initialState,
          timeSelectBox: [...initialState.timeSelectBox],
        };

        /**
         * Act
         */
        const result = weekEditReducer(initialState, {
          type: "CHANGE-TIME-HOUR",
          targetYoubi,
          changedHour,
        });

        /**
         * Assert
         */
        expect(result).toEqual(expectedState);
      }
    );
  });

  describe("CHANGE-TIME-MINUTES　各曜日の分のセレクトボックスを切り替えたとき", () => {
    test.each`
      targetYoubi | changedMinutes
      ${"日"}     | ${"30"}
      ${"日"}     | ${"00"}
    `(
      `$targetYoubiの「分」を$changedMinutesに変更する`,
      ({ targetYoubi, changedMinutes }) => {
        /**
         * Arrange
         */
        const expected = {
          ...initialState.timeSelectBox[0],
          selectedYoubi: targetYoubi,
          selectedMinutes: changedMinutes,
        };
        /**
         * Act
         */
        const result = weekEditReducer(initialState, {
          type: "CHANGE-TIME-MINUTES",
          targetYoubi,
          changedMinutes,
        });

        /**
         * Assert
         */
        expect(result.timeSelectBox[0]).toEqual(expected);
      }
    );
  });

  describe("CHANGE-TIME-MERIDIEM　各曜日のAMPMを切り替えたとき", () => {
    test.each`
      targetYoubi | changedTimeMeridiem
      ${"日"}     | ${"PM"}
      ${"日"}     | ${"AM"}
    `(
      `$targetYoubiの「AM/PM」を$changedTimeMeridiemに変更する`,
      ({ targetYoubi, changedTimeMeridiem }) => {
        /**
         * Arrange
         */
        const expected = {
          ...initialState.timeSelectBox[0],
          selectedYoubi: targetYoubi,
          selectedTimeMeridiem: changedTimeMeridiem,
        };
        /**
         * Act
         */
        const result = weekEditReducer(initialState, {
          type: "CHANGE-TIME-MERIDIEM",
          targetYoubi,
          changedTimeMeridiem,
        });

        /**
         * Assert
         */
        expect(result.timeSelectBox[0]).toEqual(expected);
      }
    );
  });
});
