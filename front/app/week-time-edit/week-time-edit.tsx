import { FC } from "react";
import "@app/globals.css";
import { DailyTimeMeridiemRadioProps } from "@app/week-time-edit/types/daily-time-meridiem-radio";
import { DailyTimeSelectBoxPops } from "@app/week-time-edit/types/daily-time-select-box";
import { DailyTimeEdit } from "./daily-time-edit";
import { WEEK_TUPLE } from "@app/week-time-edit/types/week-time-edit";
import { Grid } from "@chakra-ui/react";
import { RadioGroupButton } from "../util-parts/radio-group-button";
import { HourOption } from "@app/week-time-edit/hour-option";

type WeekTimeEditProps = {
  timeMeridiem: DailyTimeMeridiemRadioProps;
  timeSelectBox: DailyTimeSelectBoxPops;
};

export const WeekTimeEdit: FC<WeekTimeEditProps> = ({
  timeMeridiem,
  timeSelectBox,
}) => {
  return (
    <>
      <HourOption
        checked={12}
        onClick={() => {}}
      />

      <Grid
        mt={4}
        templateColumns="repeat(4, 1fr)"
        gap={1}
        className="week-time-select"
      >
        {WEEK_TUPLE.map((youbi) => (
          <DailyTimeEdit
            key={youbi}
            timeMeridiem={timeMeridiem}
            timeSelectBox={timeSelectBox}
          />
        ))}
      </Grid>
    </>
  );
};
