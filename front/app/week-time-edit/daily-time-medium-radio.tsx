import { RadioGroup, Stack } from "@chakra-ui/react";
import { CustomRadioButton } from "@app/util-parts/custom-radio-button";
import { FC, MouseEvent } from "react";

import {
  TIME_MEDIUM_TUPLE,
  TimeMeridiemString,
  YoubiString,
} from "./types-week-time-edit";

export const DailyTimeMeridiemRadio: FC<{
  checked: TimeMeridiemString;
  youbi: YoubiString;
  onRadioChange: (
    changeMediumString: YoubiString,
    event: MouseEvent<HTMLDivElement>
  ) => void;
}> = ({ checked, youbi, onRadioChange }) => {
  /**
   * 何曜日のラジオボタンが選択されてたかを管理するために、
   * 拡張したCustomRadioButtonを使っている
   */
  return (
    <RadioGroup>
      <Stack direction={"column"}>
        {TIME_MEDIUM_TUPLE.map((timeMedium) => (
          <CustomRadioButton
            key={timeMedium}
            isChecked={checked === timeMedium}
            value={timeMedium}
            extendedOnClick={(_, event) => onRadioChange(youbi, event)}
          >
            {timeMedium}
          </CustomRadioButton>
        ))}
      </Stack>
    </RadioGroup>
  );
};
