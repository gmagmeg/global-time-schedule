import { FC } from "react";
import { DailyTimeMeridiemRadio } from "./daily-time-medium-radio";
import { DailyTimeSelectBox } from "./daily-time-select-box";
import { Box, Flex } from "@chakra-ui/react";
import { DailyTimeEditProps } from "./types/daily-time-edit";

export const DailyTimeEdit: FC<DailyTimeEditProps> = ({
  targetYoubi,
  timeMeridiem,
  timeSelectBox,
}) => {
  return (
    <Flex>
      <DailyTimeMeridiemRadio
        checked={timeMeridiem.checked}
        targetYoubi={targetYoubi}
        onChange={timeMeridiem.onChange}
      />
      <Box mt={7} ml={4}>
        <DailyTimeSelectBox
          hours={timeSelectBox.hours}
          selected={timeSelectBox.selected}
          onChangeHour={timeSelectBox.onChangeHour}
          onChangeMinutes={timeSelectBox.onChangeMinutes}
        />
      </Box>
    </Flex>
  );
};
