import { FC, useState } from "react";
import { RadioGroupButton } from "../util-parts/radio-group-button";
import { DailyTimeSelectBox } from "./daily-time-select-box";
import {
  HALF_HOUR_TUPLE,
  MINUTES,
  WEEK_TUPLE,
  YoubiString,
  TimeMeridiemString,
} from "@app/week-time-edit/types-week-time-edit";
import { Grid, GridItem } from "@chakra-ui/react";
import "@app/globals.css";

export const WeekTimeEdit: FC<{}> = ({}) => {
  const [timeOption, setTimeOption] = useState("12");
  const handleTimeOption = (value: string) => {
    setTimeOption(value);
  };

  // AM/PMのラジオボタンの状態管理
  const initTimeMediumList: { selected: TimeMeridiemString }[] = WEEK_TUPLE.map(
    () => {
      return { selected: "PM" };
    }
  );
  const [timeMediumList, setTimeMediumList] = useState(initTimeMediumList);
  const handleTimeMedium = (value: string) => {
    setTimeMediumList([...timeMediumList]);
  };

  return (
    <>
      <RadioGroupButton
        list={[
          { label: "12時間表記", value: "12" },
          { label: "24時間表記", value: "24" },
        ]}
        checked={timeOption}
        onRadioChange={handleTimeOption}
      />
      {
        // １週間分の曜日選択セレクトボックス
      }
      <Grid
        mt={4}
        templateColumns="repeat(4, 1fr)"
        gap={1}
        className="week-time-select"
      >
        {WEEK_TUPLE.map((youbi) => (
          <GridItem key={youbi}>
            <DailyTimeSelectBox
              hours={HALF_HOUR_TUPLE}
              selected={{ hour: "10", minute: "30" }}
              youbi={youbi}
              onChangeTimeMedium={handleTimeMedium}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
