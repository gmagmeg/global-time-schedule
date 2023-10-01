import { FC } from "react";
import { TimeMeridiemRadio } from "./time-medium-radio";
import { TimeSelectBox } from "./time-select-box";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { DailyTimeEditProps } from "./types/daily-time-edit";

export const DailyTimeEdit: FC<DailyTimeEditProps> = ({
  targetYoubi,
  timeMeridiem,
  timeSelectBox,
}) => {
  return (
    <Flex>
      <p>{targetYoubi}</p>
      <Spacer ml={3} />
      <Box>
        <TimeSelectBox
          targetYoubi={targetYoubi}
          hours={timeSelectBox.hours}
          selected={timeSelectBox.selected}
          onChangeHour={timeSelectBox.onChangeHour}
          onChangeMinutes={timeSelectBox.onChangeMinutes}
        />
      </Box>
      <Spacer ml={3} />
      <TimeMeridiemRadio
        checked={timeMeridiem.checked}
        hoursOption={timeMeridiem.hoursOption}
        targetYoubi={targetYoubi}
        onChange={timeMeridiem.onChange}
      />
      <Spacer ml={6} />
    </Flex>
  );
};
