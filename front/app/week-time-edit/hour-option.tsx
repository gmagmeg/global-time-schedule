import { FC } from "react";
import { RadioGroup } from "@chakra-ui/react";
import { CustomRadioButton } from "../util-parts/custom-radio-button";
import {
  HOUR_OPTION,
  HourOptionNumber,
} from "@app/week-time-edit/types/hour-option";
import { HourOptionProps } from "@app/week-time-edit/types/hour-option";

export const HourOption: FC<HourOptionProps> = ({ checked, onClick }) => {
  return (
    <RadioGroup>
      <CustomRadioButton<HourOptionNumber>
        customValue={HOUR_OPTION.half}
        customOnClick={onClick}
        isChecked={checked === HOUR_OPTION.half}
      >
        12時間表記
      </CustomRadioButton>
      <CustomRadioButton<HourOptionNumber>
        ml={8}
        customValue={HOUR_OPTION.full}
        customOnClick={onClick}
        isChecked={checked === HOUR_OPTION.full}
      >
        24時間表記
      </CustomRadioButton>
    </RadioGroup>
  );
};
