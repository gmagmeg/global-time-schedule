/**
 * @module _day-schedule
 */

import {
  Box,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import {
  HourNumber,
  TimeType,
  toHourNumber,
  toMinutesNumber,
  toTimeType,
} from "../_day-schedule/type-day-schedule";
import { WeekDateTime } from "../schedule/hooks/schedule-reducer";

export const DaySchedule: FC<{
  time: WeekDateTime["Time"];
  updateDate: WeekDateTime["Date"];
  handleUpdateWeekDateTime: (
    updateDate: WeekDateTime["Date"],
    updateTime: WeekDateTime["Time"]
  ) => void;
}> = ({ updateDate, time, handleUpdateWeekDateTime }) => {
  /**
   * （AM・PM）or 24hの選択に合わせて、選択できる時間の選択肢を切り替る
   */
  const changeHourOptions = (timeType: TimeType): HourNumber[] => {
    const hour12: HourNumber[] = Array.from(
      { length: 13 },
      (_, index) => index as HourNumber
    );

    const hour24: HourNumber[] = Array.from(
      { length: 25 },
      (_, index) => index as HourNumber
    );

    return timeType === "24h" ? hour24 : hour12;
  };

  /**
   * やりたいことはWeekDateTime["Time"]の値を更新することで共通しているので、
   * type引数で更新する値を切り替えている
   */
  const onChangeTime = (
    nextValue: string,
    itemName: "hour" | "minutes" | "type"
  ): void => {
    let updateTime = {
      hour: time.hour,
      minutes: time.minutes,
      type: time.type,
    };

    switch (itemName) {
      case "hour":
        updateTime = {
          ...updateTime,
          hour: toHourNumber(nextValue),
        };
        break;
      case "minutes":
        updateTime = {
          ...updateTime,
          minutes: toMinutesNumber(nextValue),
        };
        break;
      case "type":
        updateTime = {
          ...updateTime,
          type: toTimeType(nextValue),
        };
        break;
    }

    handleUpdateWeekDateTime(updateDate, updateTime);
  };

  /**
   * CSS設定
   */
  const selectBoxStyle = {
    w: "auto",
    border: "none",
    borderBottom: "1px solid",
    borderRadius: "0",
    _focus: {
      boxShadow: "none",
      borderBottom: "2px solid",
    },
  };

  return (
    <>
      <p>
        {time.hour},{time.minutes}
      </p>
      {
        // 時間
      }
      <Select
        onChange={(e) => onChangeTime(e.target.value, "hour")}
        value={time.hour}
        {...selectBoxStyle}
      >
        {changeHourOptions(time.type).map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
      <Spacer maxW={4} />
      {
        // 分
      }
      <Select
        onChange={(e) => onChangeTime(e.target.value, "minutes")}
        value={time.minutes}
        {...selectBoxStyle}
      >
        {[0, 30].map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
      {
        // AM・PM・24h
      }
      <RadioGroup
        onChange={(value) => onChangeTime(value, "type")}
        defaultValue={time.type}
      >
        <Stack spacing={4} direction="row">
          {["AM", "PM", "24h"].map((timeOption) => (
            <Radio key={timeOption} value={timeOption}>
              {timeOption}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Box h={10} mx={4} borderRight={"1px"} />
    </>
  );
};
