import { GlobalMenuReducer, GlobalMenuAction } from "./global-menu-reducer";
import { GlobalMenuState, createStartDateList } from "./global-menu-state";

describe("GlobalMenuReducer", () => {
  it("選択された開始日に選択があたる", () => {
    const selectedStartDate = "2023-11-19";

    const action: GlobalMenuAction = {
      type: "SELECTED_START_DATE_ACTION",
      selectedStartDate,
    };
    const expectedState = {
      selectedStartDate,
      startDateList: createStartDateList(selectedStartDate),
    };
    const newState = GlobalMenuReducer(GlobalMenuState, action);
    expect(newState).toEqual(expectedState);
  });
});
