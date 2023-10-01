import { FC, useReducer, useState } from "react";
import "@app/globals.css";
import {
  TimeMeridiemString,
  TimeMeridiemOnChangeProps,
} from "@app/week-time-edit/types/time-meridiem-radio";
import {
  TimeSelectBoxPops,
  HourUnion,
  MinutesUnion,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types/time-select-box";
import { DailyTimeEdit } from "./daily-time-edit";
import { WeekUnion, WeekTuple } from "@app/week-time-edit/types/week-time-edit";
import { Grid } from "@chakra-ui/react";
import {
  HOUR_OPTION,
  HourOption as HourOptionType,
} from "@app/week-time-edit/types/hour-option";
import { HourOption } from "@app/week-time-edit/hour-option";
import { weekEditReducer, StateWeekEditReducer } from "./hooks/week-time-reducer";
import { useTimeSelect } from "@app/week-time-edit/hooks/use-time-select";

type WeekTimeEditProps = {
  timeSelectBox: TimeSelectBoxPops;
  week: WeekTuple;
};

const initState: StateWeekEditReducer = {
  hourOption: HOUR_OPTION.half,
  hoursSelectOption: HALF_HOUR_TUPLE,
  timeSelectBox: [
    {
      selectedYoubi: "日",
        selectedHour: "00",
        selectedMinutes: "00",
    },
    {
      selectedYoubi: "月",
        selectedHour: "00",
        selectedMinutes: "00",
    },
    {
      selectedYoubi: "火",
        selectedHour: "00",
        selectedMinutes: "00",
    },
    {
      selectedYoubi: "水",
        selectedHour: "00",
        selectedMinutes: "00",
    },
    {
      selectedYoubi: "木",
        selectedHour: "00",
        selectedMinutes: "00",
    },
    {
      selectedYoubi: "金",
        selectedHour: "00",
        selectedMinutes: "00",
    },
    {
      selectedYoubi: "土",
        selectedHour: "00",
        selectedMinutes: "00",
    },
  ],
}

export const WeekTimeEdit: FC<WeekTimeEditProps> = ({
  timeSelectBox,
  week, // 日、月の開始日の設定によって変動するため、propsで渡す
}) => {
  const [reducerState, reducerDispatch] = useReducer(weekEditReducer, initState);

  /**
   * 各曜日のAM/PMの切り替え
   */
  const initTimeMeridiem: { youbi: WeekUnion; checked: TimeMeridiemString }[] =
    [
      { youbi: "日", checked: "AM" },
      { youbi: "月", checked: "PM" },
      { youbi: "火", checked: "PM" },
      { youbi: "水", checked: "PM" },
      { youbi: "木", checked: "PM" },
      { youbi: "金", checked: "PM" },
      { youbi: "土", checked: "PM" },
    ];
  const [timeMeridiem, setTimeMeridiem] = useState(initTimeMeridiem);
  const handleTimeMeridiem = ({
    value,
    targetYoubi,
  }: TimeMeridiemOnChangeProps) => {
    const newTimeMeridiem = timeMeridiem.map((timeMeridiem) => {
      if (timeMeridiem.youbi === targetYoubi) {
        return { youbi: timeMeridiem.youbi, checked: value };
      } else {
        return timeMeridiem;
      }
    });
    setTimeMeridiem(newTimeMeridiem);
  };

  /**
   * 各曜日の時間選択
   */
  const onChangeHour = (targetYoubi: WeekUnion, changedHour: HourUnion) => {
    reducerDispatch({ type: "CHANGE-TIME-HOUR", targetYoubi, changedHour });
  };

  const onChangeMinutes = (targetYoubi: WeekUnion, value: MinutesUnion) => {
    // changeMinutes(targetYoubi, value)
  };

  /**
   * 12時間制と24時間制の切り替え
   */
  const handleHourOption = (hourOption: HourOptionType) => {
    reducerDispatch({ type: "CHANGE-HOUR-OPTION", hourOption });
  };

  return (
    <>
      <HourOption checked={reducerState.hourOption} onChange={handleHourOption} />
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
              checked: timeMeridiem[index].checked,
              hoursOption: reducerState.hourOption,
              targetYoubi: youbi,
              onChange: handleTimeMeridiem,
            }}
            timeSelectBox={{
              targetYoubi: youbi,
              hours: reducerState.hoursSelectOption,
              selected: {
                hour: reducerState.timeSelectBox[index].selectedHour,
                minutes: reducerState.timeSelectBox[index].selectedMinutes,
              },
              onChangeHour: onChangeHour,
              onChangeMinutes: onChangeMinutes,
            }}
          />
        ))}
      </Grid>
    </>
  );
};
