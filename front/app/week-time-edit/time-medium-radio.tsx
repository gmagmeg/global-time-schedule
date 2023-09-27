import { RadioGroup, Stack } from "@chakra-ui/react";
import { CustomRadioButton } from "@app/util-parts/custom-radio-button";
import { FC } from "react";

import { TIME_MEDIUM_TUPLE, TimeMeridiemString } from "./types-week-time-edit";
import { MouseEvent } from "react";

export const TimeMeridiemRadio: FC<{
  checked: TimeMeridiemString;
  onRadioChange: (changeTargetIndex: string, event: MouseEvent) => void;
}> = ({ checked, onRadioChange }) => {
  /**
   * 何番目のラジオボタンが選択されてたかを管理するために、
   * index番号を返せるように拡張したCustomRadioButtonを使っている
   */
  return (
    <RadioGroup>
      <Stack direction={"column"}>
        {TIME_MEDIUM_TUPLE.map((timeMedium, index) => (
          <CustomRadioButton
            key={timeMedium}
            isChecked={checked === timeMedium}
            value={String(index)}
            extendedOnClick={onRadioChange}
          >
            {timeMedium}
          </CustomRadioButton>
        ))}
      </Stack>
    </RadioGroup>
  );
};
