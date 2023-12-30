/**
 * @module _day-schedule
 */

import { Box, Radio, RadioGroup, Select, Spacer, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { SelectAmPmAll } from "./select-am-pm-all";
import { HourNumber, TimeType } from "../_day-schedule/type-day-schedule";

export const DaySchedule: FC = () => {
  const onChangeHour = (nextValue: string) => {
  }

  /**
   * AM/PMの全選択を変更した時の処理
   */
  const onChangeTimeType = (timeType: string): void => {
  };

  /**
   * 0から12までの時間を扱う
   */
  const hour12: HourNumber[] = Array.from(
    { length: 13 },
    (_, index) => index as HourNumber
  );

  /**
   * 0から24までの時間を扱う
   */
  const hour24: HourNumber[] = Array.from(
    { length: 25 },
    (_, index) => index as HourNumber
  );

  return (
    <>
      {
        /**
         * @todo まずここを引っぺがしていく？
         * 選択した時間はstateに持たなくていいはず。
         * 時間を受け取って、このコンポーネントで分解するようにしたい
         * 
         * 2023-01-01T12:00:00 と タイムゾーンを受け取って、
         * 各コンポーネントで計算するようにする
         * わざわざ上まで持っていく必要はないか？
         * Reducerを分けてもタイムゾーンの変更を受け取れれば、必要ないはず。
         * 
         * Reducerに纏めておいた方が、タイムゾーンが変わったときにどこが影響あるかわかりやすいので、一度纏めてみる。
         */
      }
      <Select
        onChange={(e) => onChangeHour(e.target.value)}
        value="12"
        w="auto"
        placeholder=""
        border="none"
        borderBottom="1px solid"
        borderRadius="0"
        _focus= {{
          boxShadow: "none",
          borderBottom: "2px solid",
        }}
      >
        {hour12.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
      <Spacer maxW={4} />
      <RadioGroup
        onChange={(value) => onChangeTimeType(value)}
        defaultValue={"AM"}
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

      {
        /**
         * @todo ここは上の階層に持たせたほうがいいか。
         * スケジュールではないし
         */
      }
      {/* {state.displayTimes.map((displayTime, index) => (
        <Text key={index} mr={8}>
          {displayTime}
        </Text>
      ))} */}
    </>
  );
};
