import { FC } from "react";
import { CustomRadioButton } from "../util-parts/custom-radio-button";
import { HOUR_OPTION } from "@app/week-time-edit/types/hour-option";
import { HourOptionProps } from "@app/week-time-edit/types/hour-option";
import { Radio, RadioGroup } from "@chakra-ui/react";

export const HourOption: FC<HourOptionProps> = ({ checked, onChange }) => {
  return (
    <RadioGroup onChange={onChange} value={checked}>
      <Radio value={HOUR_OPTION.half}>12時間表記</Radio>

      <CustomRadioButton ml={8} value={HOUR_OPTION.full}>
        24時間表記
      </CustomRadioButton>
    </RadioGroup>
  );
};
