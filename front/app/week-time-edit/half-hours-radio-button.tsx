import { FC } from "react";
import {
  TimeMeridiemTuple,
  MinutesTuple,
  MinutesString,
  TimeMeridiemString,
} from "@app/week-time-edit/types-week-time-edit";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export const HalfHoursSelectBox: FC<{
  list: TimeMeridiemTuple | MinutesTuple;
  checked: TimeMeridiemString | MinutesString;
}> = ({ list, checked }) => {
  return (
    <RadioGroup>
      <Stack direction="row">
        {list.map((value) => (
          <Radio key={value} value={value} checked={value === checked}>
            {value}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
