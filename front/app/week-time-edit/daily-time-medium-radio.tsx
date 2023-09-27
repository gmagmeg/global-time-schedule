import { RadioGroup, Stack } from "@chakra-ui/react";
import { CustomRadioButton } from "@app/util-parts/custom-radio-button";
import { FC } from "react";
import {
  DailyTimeMeridiemRadioProps,
  TIME_MEDIUM_TUPLE,
  TimeMeridiemString,
} from "@app/week-time-edit/types/daily-time-meridiem-radio";

export const DailyTimeMeridiemRadio: FC<DailyTimeMeridiemRadioProps> = ({
  checked,
  targetYoubi,
  onChange,
}) => {
  /**
   * 何曜日のラジオボタンが選択されてたかを管理するために、
   * 拡張したCustomRadioButtonを使っている
   */
  return (
    <RadioGroup>
      <p>{targetYoubi}</p>
      <Stack direction={"column"}>
        {TIME_MEDIUM_TUPLE.map((timeMedium) => (
          <CustomRadioButton<TimeMeridiemString>
            key={timeMedium}
            isChecked={checked === timeMedium}
            customValue={timeMedium}
            customOnClick={(_, event) => onChange(targetYoubi, event)}
          >
            {timeMedium}
          </CustomRadioButton>
        ))}
      </Stack>
    </RadioGroup>
  );
};
