import { FC } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export const RadioGroupButton: FC<{
  list: {label: string, value: string}[];
  checked: string;
  onRadioChange: (value: string) => void;
  direction?: "row" | "column";
}> = ({ list, checked, onRadioChange, direction = "row" }) => {

  return (
    <RadioGroup onChange={onRadioChange} value={checked}>
      <Stack direction={direction}>
        {list.map((item) => (
          <Radio key={item.value} value={item.value} checked={item.value === checked}>
            {item.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};
