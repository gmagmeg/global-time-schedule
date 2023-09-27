import { FC, useState } from "react";
import "@app/globals.css";
import { TimeMeridiemString } from "@app/week-time-edit/types/daily-time-meridiem-radio";
import { DailyTimeSelectBoxPops } from "@app/week-time-edit/types/daily-time-select-box";
import { DailyTimeEdit } from "./daily-time-edit";
import { WeekTuple } from "@app/week-time-edit/types/week-time-edit";
import { Grid } from "@chakra-ui/react";
import {
  HOUR_OPTION,
  HourOptionNumber,
} from "@app/week-time-edit/types/hour-option";
import { HourOption } from "@app/week-time-edit/hour-option";

type WeekTimeEditProps = {
  timeSelectBox: DailyTimeSelectBoxPops;
  week: WeekTuple;
};

export const WeekTimeEdit: FC<WeekTimeEditProps> = ({
  timeSelectBox,
  week, // 日、月の開始日の設定によって変動するため、propsで渡す
}) => {
  /**
   * @todo
   * AM/PMの切り替えと、時間選択はこのコンポーネント内で完結するので、
   * useStateを使って、stateを管理する。
   */

  // AM/PMの切り替え
  const initTimeMeridiem: { checked: TimeMeridiemString }[] = [
    { checked: "AM" },
    { checked: "PM" },
    { checked: "PM" },
    { checked: "PM" },
    { checked: "AM" },
    { checked: "PM" },
    { checked: "PM" },
  ];
  const [timeMeridiem, setTimeMeridiem] = useState(initTimeMeridiem);

  // 12時間制と24時間制の切り替え
  const [hourOption, setHourOption] = useState<HourOptionNumber>(HOUR_OPTION.half);

  return (
    <>
      <HourOption checked={hourOption} onClick={() => {}} />
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
              targetYoubi: youbi,
              onChange: () => {},
            }}
            timeSelectBox={timeSelectBox}
          />
        ))}
      </Grid>
    </>
  );
};
