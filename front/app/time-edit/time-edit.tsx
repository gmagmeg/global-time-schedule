import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { FC, useState, useRef, useEffect } from "react";
import { Youbi } from "./types-time-edit";
import { ChangeEvent } from "@app/event-types-alias";
import { DisplayStatus } from "@/app/common-types";

export const TimeEdit: FC<{
  youbi: Youbi;
  marginRight?: number;
}> = ({ youbi = "日" }, marginRight = 0) => {
  const refTimeSelect = useRef<HTMLSelectElement>(null);

  const [hour, setHour] = useState("18:00");

  const [timeStatus, setTimeStatus] = useState<DisplayStatus>("hidden");

  // 時間のセレクトボックスの表示・非表示を切り替える
  const handleClickInput = (): void => {
    refTimeSelect.current?.focus();
  };

  // HH:MMフォーマットの24時間分の時間生成
  const hours = [...Array(24)].map((_, hour: number) => {
    return `${String(hour).padStart(2, "0")}:00`;
  });

  // 時間を変更したときの処理
  const handleChangeTime = ({ target }: ChangeEvent) => {
    setHour(target.value);
  };

  // 一致した時間を選択状態にする
  const isSelectedTime = (timeValue: string) => {
    return timeValue === hour;
  };

  return (
    <FormControl mr={marginRight}>
      <FormLabel>{youbi}曜日</FormLabel>
      <Input
        onClick={handleClickInput}
        htmlSize={4}
        width="auto"
        type="time"
        value={hour}
      />
      <Select
        ref={refTimeSelect}
        width={200}
        onChange={handleChangeTime}
        variant={hour}
      >
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
    </FormControl>
  );
};
