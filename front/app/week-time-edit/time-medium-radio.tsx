import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FC } from "react";
import {
  TimeMeridiemRadioProps,
  TIME_MEDIUM_TUPLE,
  toTimeMeridiem,
} from "@app/week-time-edit/types/time-meridiem-radio";
import { HourUnion, HoursOptionUnion } from "./types/time-select-box";

export const TimeMeridiemRadio: FC<TimeMeridiemRadioProps> = ({
  checked,
  hoursOption,
  targetYoubi,
  onChange,
}) => {
  const handleChange = (value: string): void => {
    onChange(targetYoubi, toTimeMeridiem(value));
  };

  const isDisabled = (hourOption: HoursOptionUnion): boolean => {
    return hourOption === "24";
  };

  return (
    <RadioGroup onChange={handleChange} value={checked}>
      <Stack direction={"column"}>
        {TIME_MEDIUM_TUPLE.map((timeMedium) => (
          <Radio
            key={timeMedium}
            isChecked={checked === timeMedium}
            value={timeMedium}
            isDisabled={isDisabled(hoursOption)}
          >
            {timeMedium}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
