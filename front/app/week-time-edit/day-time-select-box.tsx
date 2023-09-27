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
import { RadioGroupButton } from "@app/util-parts/radio-group-button";

export const DayTimeSelectBox: FC<{
  hours: HourTuple;
  selected: {
    hour: HourString;
    minute: MinutesString;
  };
  youbi: YoubiString;
  onChangeTimeMedium: (value: string) => void;
}> = ({ hours, selected, youbi, onChangeTimeMedium }) => {
  const [hour, setHour] = useState("18");

  // 時間を変更したときの処理
  const handleChangeTime = ({ target }: ChangeEvent) => {
    setHour(target.value);
  };

  // 一致した時間を選択状態にする
  const isSelectedTime = (timeValue: string) => {
    return timeValue === hour;
  };

  // AM/PMを変更したときの処理
  const [timeMedium, setTimeMedium] = useState("PM");
  const handleTimeMedium = (value: string) => {
    setTimeMedium(value);
  };

  return (
    <>
      <span>{youbi}</span>
      <Flex gap={2}>
        {
          // 午前午後のラジオボタン
        }
        <RadioGroupButton
          list={[
            { label: "AM", value: "AM" },
            { label: "PM", value: "PM" },
          ]}
          checked={timeMedium}
          onRadioChange={onChangeTimeMedium}
          direction="column"
        />
        {
          // 時間のセレクトボックス
        }
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
        {
          // 分のセレクトボックス
        }
        <Select width={90}>
          {MINUTES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </Flex>
    </>
  );
};
