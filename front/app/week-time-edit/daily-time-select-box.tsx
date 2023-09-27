import { Select, Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import {
  MinutesString,
  HourString,
  HourTuple,
  YoubiString,
  MINUTES,
} from "./types-week-time-edit";
import { ChangeEvent } from "@app/event-types-alias";

export const DailyTimeSelectBox: FC<{
  hours: HourTuple;
  selected: {
    hour: HourString;
    minute: MinutesString;
  };
  youbi: YoubiString;
  onChangeTimeMedium: (value: string) => void;
}> = ({ hours, }) => {
  const [hour, setHour] = useState("10");

  // 時間を変更したときの処理
  const handleChangeTime = ({ target }: ChangeEvent) => {
    setHour(target.value);
  };

  const handleChangeMinutes = () => {};

  return (
    <Flex gap={2}>
      {
        // 時間のセレクトボックス
      }
      <Select width={90} onChange={handleChangeTime} value={hour}>
        {hours.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </Select>
      <span>:</span>
      {
        // 分のセレクトボックス
      }
      <Select width={90} onChange={handleChangeMinutes} value={"00"}>
        {MINUTES.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
