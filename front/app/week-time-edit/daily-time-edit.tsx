import { Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import { DailyTimeMeridiemRadio } from "./daily-time-medium-radio";
import { TimeMeridiemString, YoubiString } from "./types-week-time-edit";

export const コンポーネント名: FC<{
  youbi: YoubiString;
}> = ({ youbi }) => {
  // AM/PMを変更したときの処理
  const [timeMedium, setTimeMedium] = useState<TimeMeridiemString>("PM");
  const handleTimeMedium = (value: string) => {};

  return (
    <>
      <span>{youbi}</span>
      <Flex gap={2}>
        {
          // 午前午後のラジオボタン
        }
        <DailyTimeMeridiemRadio
          checked={timeMedium}
          youbi={youbi}
          onRadioChange={handleTimeMedium}
        />
      </Flex>
    </>
  );
};
