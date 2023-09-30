import {
  weekEditReducer,
  StateWeekEditReducer,
} from "@app/week-time-edit/week-time-reducer";
import {
  FULL_HOUR_TUPLE,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types/time-select-box";
import { HOUR_OPTION } from "@app/week-time-edit/types/hour-option";

describe("weekEditReducer", () => {
  const initialState: StateWeekEditReducer = {
    hourOption: HOUR_OPTION.half,
    timeSelectBox: {
      targetYoubi: "日",
      hours: FULL_HOUR_TUPLE,
    },
  };

  test.each`
    hourOption | selectedHour
    ${"12"}    | ${HALF_HOUR_TUPLE}
    ${"24"}    | ${FULL_HOUR_TUPLE}
  `(
    `$hourOption が選択されている場合、対応したオプションになる`,
    ({ hourOption, selectedHour }) => {
      /**
       * Arrange
       */
      const expectedState: StateWeekEditReducer = {
        ...initialState,
        hourOption,
        timeSelectBox: {
          ...initialState.timeSelectBox,
          hours: selectedHour,
        },
      };

      /**
       * Act
       */
      const result = weekEditReducer(initialState, {
        type: "ChangeHourOption",
        hourOption,
      });

      /**
       * Assert
       */
      expect(result).toEqual(expectedState);
    }
  );
});
