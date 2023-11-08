import { GlobalMenuReducer, GlobalMenuAction } from "./global-menu-reducer";
import { GlobalMenuState, createStartDateList } from "./global-menu-state";

describe("GlobalMenuReducer", () => {
  it("選択された開始日に選択があたる", () => {
    const action: GlobalMenuAction = {
      type: "SELECTED_START_DATE_ACTION",
      selectedDate: "2023-11-12",
    };
    const expectedState = {
      selectedStartDate: "2023-11-12",
      startDateList: createStartDateList("2023-11-12"),
    };
    const newState = GlobalMenuReducer(GlobalMenuState, action);
    expect(newState).toEqual(expectedState);
  });
});
