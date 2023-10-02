import { FC, useReducer } from "react";
import "@app/globals.css";
import {
  TimeMeridiemUnion
} from "@app/week-time-edit/types/time-meridiem-radio";
import {
  HourUnion,
  MinutesUnion,
} from "@app/week-time-edit/types/time-select-box";
import { DailyTimeEdit } from "./daily-time-edit";
import { WeekUnion, WeekTuple } from "@app/week-time-edit/types/week-time-edit";
import { Grid } from "@chakra-ui/react";
import {
  HourOption as HourOptionType,
} from "@app/week-time-edit/types/hour-option";
import { HourOption } from "@app/week-time-edit/hour-option";
import {
  weekEditReducer,
  initialReduceState
} from "./hooks/week-time-reducer";

type WeekTimeEditProps = {
  week: WeekTuple;
};

export const WeekTimeEdit: FC<WeekTimeEditProps> = ({
  week, // 日、月の開始日の設定によって変動するため、propsで渡す
}) => {
  const [reducerState, reducerDispatch] = useReducer(
    weekEditReducer,
    initialReduceState
  );

  /**
   * 12時間制と24時間制の切り替え
   */
  const handleHourOption = (hourOption: HourOptionType) => {
    reducerDispatch({ type: "CHANGE-HOUR-OPTION", hourOption });
  };

  /**
   * 各曜日の時間選択
   */
  // 時：分の「時」部分の変更時の更新処理
  const handleChangeHour = (targetYoubi: WeekUnion, changedHour: HourUnion) => {
    reducerDispatch({ type: "CHANGE-TIME-HOUR", targetYoubi, changedHour });
  };

  // 時：分の「分」部分の変更時の更新処理
  const handleMinutes = (
    targetYoubi: WeekUnion,
    changedMinutes: MinutesUnion
  ) => {
    reducerDispatch({
      type: "CHANGE-TIME-MINUTES",
      targetYoubi,
      changedMinutes,
    });
  };

  // AM/PMの切り替え
  const handleChangeTimeMeridiem = (
    targetYoubi: WeekUnion,
    changedTimeMeridiem: TimeMeridiemUnion
  ) => {
    reducerDispatch({
      type: "CHANGE-TIME-MERIDIEM",
      targetYoubi,
      changedTimeMeridiem,
    });
  };

  return (
    <>
      <HourOption
        checked={reducerState.hourOption}
        onChange={handleHourOption}
      />
      <Grid
        mt={4}
        templateColumns="repeat(4, 1fr)"
        gap={1}
        className="week-time-select"
      >
        {week.map((youbi, index) => (
          <DailyTimeEdit
            key={youbi}
            targetYoubi={youbi}
            timeMeridiem={{
              checked: reducerState.timeSelectBox[index].selectedTimeMeridiem,
              hoursOption: reducerState.hourOption,
              targetYoubi: youbi,
              onChange: handleChangeTimeMeridiem,
            }}
            timeSelectBox={{
              targetYoubi: youbi,
              hours: reducerState.hoursSelectOption,
              selected: {
                hour: reducerState.timeSelectBox[index].selectedHour,
                minutes: reducerState.timeSelectBox[index].selectedMinutes,
              },
              onChangeHour: handleChangeHour,
              onChangeMinutes: handleMinutes,
            }}
          />
        ))}
      </Grid>
    </>
  );
};
