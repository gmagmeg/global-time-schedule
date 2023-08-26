/**
 * @module _week-schedule
 */

import { Box, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import {
  ScheduleAction,
  ScheduleState,
  TimeFormat,
  WeekDateTime,
} from "../schedule/hooks/schedule-reducer";
import { TimeType } from "../_day-schedule/type-day-schedule";

export const TimeTypePattern = ({
  updateDate,
  time,
  timeTypePattern,
  scheduleDispatch,
}: {
  updateDate: WeekDateTime["Date"];
  time: WeekDateTime["Time"];
  timeTypePattern: ScheduleState["timeTypePattern"];
  index: number;
  scheduleDispatch: (action: ScheduleAction) => void;
}) => {
  const onChangeRadioTimeType = (nextValue: string): void => {
    const updateTime: TimeFormat = {
      hour: time.hour,
      minutes: time.minutes,
      type: nextValue as TimeType,
    };

    scheduleDispatch({
      type: "UPDATE_HOUR_MINUTES",
      updateDate,
      updateTime,
    });
  };

  return (
    <Box width={"6em"}>
      {timeTypePattern === "AM/PM" && (
        <RadioGroup
          mt={1}
          onChange={(value) => onChangeRadioTimeType(value)}
          defaultValue={time.type}
        >
          <Stack spacing={2} direction="row">
            {["AM", "PM"].map((timeOption) => (
              <Radio colorScheme="purple" key={timeOption} value={timeOption}>
                {timeOption}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      )}
      {timeTypePattern === "24h" && (
        <RadioGroup
          mt={1}
          colorScheme="purple"
          onChange={(value) => onChangeRadioTimeType(value)}
          defaultValue={time.type}
        >
          <Stack spacing={2} direction="row">
            {["24h"].map((timeOption) => (
              <Radio key={timeOption} value={timeOption}>
                {timeOption}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      )}
    </Box>
  );
};
