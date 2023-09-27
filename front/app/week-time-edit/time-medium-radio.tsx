import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FC } from "react";
import {
  TimeMeridiemRadioProps,
  TIME_MEDIUM_TUPLE,
  toTimeMeridiem,
} from "@app/week-time-edit/types/time-meridiem-radio";

export const TimeMeridiemRadio: FC<TimeMeridiemRadioProps> = ({
  checked,
  targetYoubi,
  onChange,
}) => {
  const handleChange = (value: string): void => {
    onChange({value: toTimeMeridiem(value), targetYoubi});
  }

  return (
    <RadioGroup onChange={handleChange} value={checked}>
      <p>{targetYoubi}</p>
      <Stack direction={"column"}>
        {TIME_MEDIUM_TUPLE.map((timeMedium) => (
          <Radio
            key={timeMedium}
            isChecked={checked === timeMedium}
            value={timeMedium}
          >
            {timeMedium}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
