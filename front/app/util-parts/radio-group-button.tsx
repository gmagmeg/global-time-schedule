import { FC, useState } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export const RadioGroupButton: FC<{
  list: string[];
  checked: string;
  direction: "row" | "column";
}> = ({ list, checked, direction = "row" }) => {
  const [value, setValue] = useState(checked);

  const handleRadioGroup = (value: string) => {
    setValue(value);
  };

  return (
    <RadioGroup onChange={handleRadioGroup} value={value}>
      <Stack direction={direction}>
        {list.map((value) => (
          <Radio key={value} value={value} checked={value === checked}>
            {value}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
