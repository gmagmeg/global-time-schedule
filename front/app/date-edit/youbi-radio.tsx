import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { WeekStartDay } from "@app/date-edit/types-date-edit";
import { FC, useState } from "react";

export const YoubiRadio: FC<{ youbi: WeekStartDay }> = ({ youbi }) => {
  const [weekStartDay, setWeekStartDay] = useState<WeekStartDay>(youbi);

  const handleChangeRadio = (value: WeekStartDay) => {
    setWeekStartDay(value);
  };

  return (
    <RadioGroup onChange={handleChangeRadio} value={weekStartDay}>
      <Stack direction="column">
        <Radio value="Sun">日曜日始まり</Radio>
        <Radio value="Mon">月曜日始まり</Radio>
      </Stack>
    </RadioGroup>
  );
};
