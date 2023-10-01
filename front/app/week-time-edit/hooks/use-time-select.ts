import react from "react";
import { HourUnion, MinutesUnion } from "../types/time-select-box";
import { WeekUnion } from "../types/week-time-edit";

/**
 * 各曜日の時間選択
 */
const initTimeSelect: {
  youbi: WeekUnion;
  selected: { hour: HourUnion; minutes: MinutesUnion };
}[] = [
  { youbi: "日", selected: { hour: "01", minutes: "00" } },
  { youbi: "月", selected: { hour: "02", minutes: "30" } },
  { youbi: "火", selected: { hour: "03", minutes: "00" } },
  { youbi: "水", selected: { hour: "04", minutes: "30" } },
  { youbi: "木", selected: { hour: "05", minutes: "00" } },
  { youbi: "金", selected: { hour: "06", minutes: "30" } },
  { youbi: "土", selected: { hour: "07", minutes: "00" } },
];

type TimeSelect = {
  youbi: WeekUnion;
  selected: { hour: HourUnion; minutes: MinutesUnion };
};

export const useTimeSelect = (initState: TimeSelect[]) => {
  // 初期化
  const [timeSelect, setTimeSelect] = react.useState(initState);

  // 時間変更時の更新処理
  const changeHour = (targetYoubi: WeekUnion, changedValue: HourUnion) => {
    const newTimeSelect = timeSelect.map((state) => {
      let result = state;
      if (state.youbi === targetYoubi) {
        result = {
          ...state,
          youbi: state.youbi,
          selected: { hour: changedValue, minutes: state.selected.minutes },
        };
      }

      return state;
    });

    setTimeSelect(newTimeSelect);
  };

  // 分変更時の更新処理
  const changeMinutes = (
    targetYoubi: WeekUnion,
    changedValue: MinutesUnion
  ) => {
    const newTimeSelect = timeSelect.map((state) => {
      let result = state;
      if (state.youbi === targetYoubi) {
        result = {
          ...state,
          youbi: state.youbi,
          selected: { hour: state.selected.hour, minutes: changedValue },
        };
      }

      return state;
    });

    setTimeSelect(newTimeSelect);
  };

  return { timeSelect, changeHour, changeMinutes };
};
