import { Select, Flex, Icon } from "@chakra-ui/react";
import { FC, ChangeEvent } from "react";
import {
  TimeSelectBoxPops,
  MINUTES,
  HourUnion,
  MinutesUnion,
} from "@editContents/week-time-edit/types/time-select-box";
import { SiWakatime } from "react-icons/si";

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
    <Flex gap={2} align={"baseline"}>
      <Icon as={SiWakatime} mr={2} />
      <Select width={70} onChange={handleChangeHour} value={selected.hour}>
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </Select>
      <span>:</span>
      <Select
        width={70}
        onChange={handleChangeMinutes}
        value={selected.minutes}
      >
        {MINUTES.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
