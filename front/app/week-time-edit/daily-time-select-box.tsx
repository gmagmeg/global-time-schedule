import { Select, Flex } from "@chakra-ui/react";
import { FC } from "react";
import {
  MinutesString,
  HourString,
  MINUTES,
  HourTuple,
} from "@app/week-time-edit/types-week-time-edit";
import { SelectChangeEvent } from "@app/event-types-alias";

export const DailyTimeSelectBox: FC<{
  hours: HourTuple;
  selected: {
    hour: HourString;
    minutes: MinutesString;
  };
  onChangeTimeHour: (event: SelectChangeEvent) => void;
  onChangeMinutes: (event: SelectChangeEvent) => void;
}> = ({ hours, selected, onChangeTimeHour, onChangeMinutes }) => {
  return (
    <Flex gap={2}>
      {
        // 時間のセレクトボックス
      }
      <Select width={90} onChange={onChangeTimeHour} value={selected.hour}>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </Select>
      <span>:</span>
      {
        // 分のセレクトボックス
      }
      <Select width={90} onChange={onChangeMinutes} value={selected.minutes}>
        {MINUTES.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
