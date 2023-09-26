import { Select } from "@chakra-ui/react";
import { FC, useState } from "react";
import {
  MinutesString,
  MinutesTuple,
  HourString,
  HourTuple,
} from "./types-week-time-edit";
import { ChangeEvent } from "@app/event-types-alias";

export const TimeEdit: FC<{
  hours: HourTuple;
  minutes: MinutesTuple;
  selected: {
    hour: HourString;
    minute: MinutesString;
  };
}> = ({ hours, minutes, selected }) => {
  const [hour, setHour] = useState("18");

  // 時間を変更したときの処理
  const handleChangeTime = ({ target }: ChangeEvent) => {
    setHour(target.value);
  };

  // 一致した時間を選択状態にする
  const isSelectedTime = (timeValue: string) => {
    return timeValue === hour;
  };

  return (
    <>
      <Select width={90} onChange={handleChangeTime} value={hour}>
        {hours.map((optionValue) => (
          <option
            key={optionValue}
            value={optionValue}
            selected={isSelectedTime(optionValue)}
          >
            {optionValue}
          </option>
        ))}
      </Select>
      <span>:</span>
      <Select width={90}>
        {minutes.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </>
  );
};
