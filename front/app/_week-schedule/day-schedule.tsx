/**
 * @module _day-schedule
 */

import { Box, Radio, RadioGroup, Select, Spacer, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { HourNumber, TimeType } from "../_day-schedule/type-day-schedule";
import { DateTimeString } from "@/library/type-date";
import { customDayjs } from "@/library/dayjs";

export const DaySchedule: FC<{weekStartDateTime: DateTimeString}> = ({weekStartDateTime}) => {

  /**
   * ステータスを減らすために、開始時間を解析して
   * 時、分、AM・PM・24hの情報に分解する形をとっている
   */
  const createTimes = (weekStartDate: DateTimeString): [number, number, TimeType] => {
    let timeType: TimeType = "24h";
    if (weekStartDate.includes("AM")) {
      timeType = "AM";
    } else if (weekStartDate.includes("PM")) {
      timeType = "PM";
    }
    const day = customDayjs(weekStartDate);

    return [day.hour(), day.minute(), timeType];
  }
  const [selectedHour, selectedMinutes, selectedTimeType] = createTimes(weekStartDateTime);
 

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
  }

  const onChangeHour = (nextValue: string) => {
  }

  const onChangeMinutes = (nextValue: string) => {
  }

  /**
   * AM/PMの全選択を変更した時の処理
   */
  const onChangeTimeType = (timeType: string): void => {
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
  }
 
  return (
    <>
      {
        // 時間
      }
      <Select
        onChange={(e) => onChangeHour(e.target.value)}
        value={selectedHour}
        {...selectBoxStyle}
      >
        {changeHourOptions(selectedTimeType).map((time) => (
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
        onChange={(e) => onChangeMinutes(e.target.value)}
        value={selectedMinutes}
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
        onChange={(value) => onChangeTimeType(value)}
        defaultValue={selectedTimeType}
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
