import { FC } from "react";
import { DailyTimeMeridiemRadio } from "./daily-time-medium-radio";
import { DailyTimeMeridiemRadioProps } from "@app/week-time-edit/types/daily-time-meridiem-radio";
import { DailyTimeSelectBoxPops } from "@app/week-time-edit/types/daily-time-select-box";
import { DailyTimeSelectBox } from "./daily-time-select-box";
import { Box, Flex } from "@chakra-ui/react";

type LocalProps = {
  timeMeridiem: DailyTimeMeridiemRadioProps;
  timeSelectBox: DailyTimeSelectBoxPops;
};

export const DailyTimeEdit: FC<LocalProps> = ({
  timeMeridiem,
  timeSelectBox,
}) => {
  return (
    <Flex>
      <DailyTimeMeridiemRadio
        checked={timeMeridiem.checked}
        targetYoubi={timeMeridiem.targetYoubi}
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
