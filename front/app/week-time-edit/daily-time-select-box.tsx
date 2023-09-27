import { Select, Flex } from "@chakra-ui/react";
import { FC } from "react";
import {
  DailyTimeSelectBoxPops,
  MINUTES,
} from "@app/week-time-edit/types/daily-time-select-box";

export const DailyTimeSelectBox: FC<DailyTimeSelectBoxPops> = ({
  hours,
  selected,
  onChangeHour,
  onChangeMinutes,
}) => {
  return (
    <Flex gap={2} align={"baseline"}>
      <Select width={90} onChange={onChangeHour} value={selected.hour}>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </Select>
      <span>:</span>
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
