import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { WeekStartDay } from "@app/date-edit/types-date-edit";
import { FC } from "react";

export const YoubiRadio: FC<{
  weekStartDay: WeekStartDay;
  onChangeRadio: (startDay: WeekStartDay) => void;
}> = ({ weekStartDay, onChangeRadio }) => {
  return (
    <RadioGroup onChange={onChangeRadio} value={weekStartDay}>
      <Stack direction="column">
        <Radio value="Sun">日曜日始まり</Radio>
        <Radio value="Mon">月曜日始まり</Radio>
      </Stack>
    </RadioGroup>
  );
};
