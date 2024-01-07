/**
 * @module _week-schedule
 */

import {
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { ScheduleAction, ScheduleState, TimeFormat, WeekDateTime } from "../schedule/hooks/schedule-reducer";
import { TimeType } from "../_day-schedule/type-day-schedule";

export const TimeTypePattern = ({
  updateDate,
  time,
  timeTypePattern,
  index,
  scheduleDispatch
}: {
  updateDate: WeekDateTime["Date"];
  time: WeekDateTime["Time"];
  timeTypePattern: ScheduleState["timeTypePattern"];
  index: number;
  scheduleDispatch: (action: ScheduleAction) => void;
}) => {
  const onChangeSelectTimeType = (
    nextValue: string,
  ): void => {
    
    scheduleDispatch({
      type: "DECIDE_TIME_TYPE_PATTERN",
      timeTypePattern: nextValue as ScheduleState["timeTypePattern"],
    })
  }

  const onChangeRadioTimeType = (
    nextValue: string,
  ): void => {
    const updateTime: TimeFormat = {
      hour: time.hour,
      minutes: time.minutes,
      type: nextValue as TimeType
    }

    scheduleDispatch({
      type: "UPDATE_HOUR_MINUTES",
      updateDate,
      updateTime
    })
  }

  const createRadioTimeType = (): string[] => {
    return (timeTypePattern === "AM/PM")
      ? ["AM", "PM"]
      : ["24h"];
  }

  return (
    <>
    {index === 0 && 
      <Select 
        maxW={"110px"} onChange={(event) => onChangeSelectTimeType(event.target.value)}>
        <option value='AM/PM'>AM/PM</option>
        <option value='24h'>24h</option>
      </Select>
    }
    {timeTypePattern === "AM/PM" &&
      <RadioGroup
        onChange={(value) => onChangeRadioTimeType(value)}
        defaultValue={time.type}
      >
        <Stack spacing={2} direction="row">
          {["AM", "PM"].map((timeOption) => (
            <Radio key={timeOption} value={timeOption}>
              {timeOption}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    }
    {timeTypePattern === "24h" &&
      <RadioGroup
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
    }
    </>
  );
};
