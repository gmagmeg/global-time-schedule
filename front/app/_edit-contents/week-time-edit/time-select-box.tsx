import { selectAnatomy } from "@chakra-ui/anatomy";
import {
  Box,
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/react";

import { Select, Flex, Icon, Highlight } from "@chakra-ui/react";
import { FC, ChangeEvent } from "react";
import {
  TimeSelectBoxPops,
  MINUTES,
  HourUnion,
  MinutesUnion,
} from "@editContents/week-time-edit/types/time-select-box";

export const TimeSelectBox: FC<TimeSelectBoxPops> = ({
  targetYoubi,
  hours,
  selected,
  onChangeHour,
  onChangeMinutes,
}) => {
  const handleChangeHour = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const hour = target.value as HourUnion;
    onChangeHour(targetYoubi, hour);
  };

  const handleChangeMinutes = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const minutes = target.value as MinutesUnion;
    onChangeMinutes(targetYoubi, minutes);
  };

  return (
    <Flex gap={2} direction={"row"} align={"baseline"}>
      <Box className="time-select-box">
        <Select
          variant="flushed"
          width={50}
          onChange={handleChangeHour}
          value={selected.hour}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </Select>
      </Box>
      <span>:</span>
      <Box className="time-select-box">
        <Select
          variant="flushed"
          width={50}
          onChange={handleChangeMinutes}
          value={selected.minutes}
        >
          {MINUTES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  );
};
