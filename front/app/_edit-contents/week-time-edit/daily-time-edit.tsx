import { FC } from "react";
import { TimeMeridiemRadio } from "./time-medium-radio";
import { TimeSelectBox } from "./time-select-box";
import {
  Box,
  Divider,
  Grid,
  GridItem,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { DailyTimeEditProps } from "./types/daily-time-edit";
import { AiOutlineSchedule } from "react-icons/ai";
import { GrResume } from "react-icons/gr";
import "@app/globals.css";

export const DailyTimeEdit: FC<DailyTimeEditProps> = ({
  targetYoubi,
  timeMeridiem,
  timeSelectBox,
}) => {
  return (
    <Box>
      <p>{targetYoubi}</p>
      <Divider colorScheme="twitter" mb={2} />

      <Grid
        templateColumns="repeat(2, 0fr)"
        className="daily-edit-contents"
        mb={4}
      >
        <GridItem>
          <TimeSelectBox
            targetYoubi={targetYoubi}
            hours={timeSelectBox.hours}
            selected={timeSelectBox.selected}
            onChangeHour={timeSelectBox.onChangeHour}
            onChangeMinutes={timeSelectBox.onChangeMinutes}
          />
          {/*　計算結果 */}
        </GridItem>
        <GridItem ml={4}>
          <TimeMeridiemRadio
            checked={timeMeridiem.checked}
            hoursOption={timeMeridiem.hoursOption}
            targetYoubi={targetYoubi}
            onChange={timeMeridiem.onChange}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
