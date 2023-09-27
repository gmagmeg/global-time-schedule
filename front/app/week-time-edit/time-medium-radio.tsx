import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FC } from "react";

import { TIME_MEDIUM_TUPLE, TimeMeridiemString } from "./types-week-time-edit";
import { RadioChangeEvent } from "@app/event-types-alias";

export const TimeMeridiemRadio: FC<{
  checked: TimeMeridiemString;
  onChange: RadioChangeEventHandler;
}> = ({ checked, onChange }) => {
  const handleRadioChange = (
    event: RadioChangeEvent,
    key: TimeMeridiemString
  ) => {
    onChange(target.value);
  };

  return (
    <RadioGroup value={checked}>
      <Stack direction={"row"}>
        {TIME_MEDIUM_TUPLE.map((timeMedium) => (
          <Radio
            key={timeMedium}
            value={timeMedium}
            checked={timeMedium === checked}
            onChange={handleRadioChange(event, timeMedium)}
          >
            {timeMedium}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
