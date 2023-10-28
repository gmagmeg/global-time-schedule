import { FC } from "react";
import { TimeMeridiemRadio } from "./time-medium-radio";
import { TimeSelectBox } from "./time-select-box";
import { Box, Flex } from "@chakra-ui/react";
import { DailyTimeEditProps } from "./types/daily-time-edit";
import "@app/globals.css";

export const DailyTimeEdit: FC<DailyTimeEditProps> = ({
  targetYoubi,
  timeMeridiem,
  timeSelectBox,
}) => {
  return (
    <Flex align={"baseline"} direction={"row"}>
      <Box>
        <TimeSelectBox
          targetYoubi={targetYoubi}
          hours={timeSelectBox.hours}
          selected={timeSelectBox.selected}
          onChangeHour={timeSelectBox.onChangeHour}
          onChangeMinutes={timeSelectBox.onChangeMinutes}
        />
      </Box>
      <Box ml={6}>
        {/*　計算結果 */}
        <TimeMeridiemRadio
          checked={timeMeridiem.checked}
          hoursOption={timeMeridiem.hoursOption}
          targetYoubi={targetYoubi}
          onChange={timeMeridiem.onChange}
        />
      </Box>
    </Flex>
  );
};
