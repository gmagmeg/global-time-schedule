import { FC } from "react";
import { TimeMeridiemRadio } from "./time-medium-radio";
import { TimeSelectBox } from "./time-select-box";
import { Box, Flex } from "@chakra-ui/react";
import { DailyTimeEditProps } from "./types/daily-time-edit";

export const DailyTimeEdit: FC<DailyTimeEditProps> = ({
  targetYoubi,
  timeMeridiem,
  timeSelectBox,
}) => {
  return (
    <Flex>
      <TimeMeridiemRadio
        checked={timeMeridiem.checked}
        hoursOption={timeMeridiem.hoursOption}
        targetYoubi={targetYoubi}
        onChange={timeMeridiem.onChange}
      />
      <Box mt={7} ml={4}>
        <TimeSelectBox
          targetYoubi={targetYoubi}
          hours={timeSelectBox.hours}
          selected={timeSelectBox.selected}
          onChangeHour={timeSelectBox.onChangeHour}
          onChangeMinutes={timeSelectBox.onChangeMinutes}
        />
      </Box>
    </Flex>
  );
};
