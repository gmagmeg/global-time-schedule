import { FC } from "react";
import { RadioGroupButton } from "../util-parts/radio-group-button";
import { DayTimeSelectBox } from "./day-time-select-box";
import {
  HALF_HOUR_TUPLE,
  MINUTES,
  YOUBI,
} from "@app/week-time-edit/types-week-time-edit";
import { Grid, GridItem } from "@chakra-ui/react";
import "@app/globals.css";

export const WeekTimeEdit: FC<{}> = ({}) => {
  return (
    <>
      <RadioGroupButton
        list={[
          { label: "12時間表記", value: "12" },
          { label: "24時間表記", value: "24" },
        ]}
        checked={"12"}
        onRadioChange={(value) => console.log(value)}
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
        {YOUBI.map((youbi) => (
          <GridItem key={youbi}>
            <DayTimeSelectBox
              hours={HALF_HOUR_TUPLE}
              minutes={MINUTES}
              selected={{ hour: "10", minute: "30" }}
              youbi={youbi}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
