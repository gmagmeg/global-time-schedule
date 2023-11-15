import dayjs from "dayjs";
import { GlobalMenuReducer, GlobalMenuAction } from "./global-menu-reducer";
import { GlobalMenuState, createStartDateList } from "./global-menu-state";

describe("GlobalMenuReducer", () => {
  it("選択された開始日に選択があたる", () => {
    const selectedDate = dayjs().format("YYYY-MM-DD");

    const action: GlobalMenuAction = {
      type: "SELECTED_START_DATE_ACTION",
      selectedDate,
    };
    const expectedState = {
      selectedStartDate: selectedDate,
      startDateList: createStartDateList(selectedDate),
    };
    const newState = GlobalMenuReducer(GlobalMenuState, action);
    expect(newState).toEqual(expectedState);
  });
});
