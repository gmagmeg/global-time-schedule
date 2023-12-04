import { hour12, hour24 } from "../_day-schedule-function";
import { DayScheduleReducer, DayScheduleAction } from "./day-schedule-reducer";
import { DayScheduleState, dayScheduleState } from "./day-schedule-state";

describe("DayScheduleReducer", () => {
  it("時間のセレクトボックスを変更すると、選択状態の時間が更新される", () => {
    // Arrange
    const initialState: DayScheduleState = dayScheduleState;
    const action: DayScheduleAction = {
      type: "CHANGE_HOUR_SELECT_BOX",
      hour: 10,
    };

    // Act
    const newState = DayScheduleReducer(initialState, action);

    // Assert
    expect(newState.selectedTime.hour).toBe(10);
  });

  it("分のセレクトボックスを変更すると、選択状態の分が更新される", () => {
    // Arrange
    const initialState: DayScheduleState = dayScheduleState;
    const action: DayScheduleAction = {
      type: "CHANGE_MINUTES_SELECT_BOX",
      minutes: 30,
    };

    // Act
    const newState = DayScheduleReducer(initialState, action);

    // Assert
    expect(newState.selectedTime.minute).toBe(30);
  });

  describe("AM/PM、24hの切り替え", () => {
    it("AM/PM → 24hを選択した場合、24時間分の選択肢が出来る", () => {
      // Arrange
      const initialState: DayScheduleState = dayScheduleState;
      initialState.selectedTime.type = "AM";

      const action: DayScheduleAction = {
        type: "CHANGE_AM_PM_ALL",
        timeType: "24h",
      };

      // Act
      const newState = DayScheduleReducer(initialState, action);

      // Assert
      expect(newState.timeSelectOption.hour).toBe(hour24);
    });

    it("24h → AM/PMを選択した場合、12時間分の選択肢が出来て、出力時間のフォーマットが変わる", () => {
      // Arrange
      const initialState: DayScheduleState = dayScheduleState;
      initialState.selectedTime.type = "24h";

      const action: DayScheduleAction = {
        type: "CHANGE_AM_PM_ALL",
        timeType: "AM",
      };

      // Act
      const newState = DayScheduleReducer(initialState, action);

      // Assert
      expect(newState.timeSelectOption.hour).toBe(hour12);
    });

    it("24hを選択時、時間を出力する", () => {
      // Arrange
      let initialState: DayScheduleState = dayScheduleState;
      initialState.selectedTime.type = "24h";
      initialState.selectedTime.hour = 18;

      const action: DayScheduleAction = {
        type: "CHANGE_AM_PM_ALL",
        timeType: "AM",
      };

      // Act
      const newState = DayScheduleReducer(initialState, action);

      // Assert
      expect(newState.selectedTime.hour).toBe(6);
    });
  });
});
