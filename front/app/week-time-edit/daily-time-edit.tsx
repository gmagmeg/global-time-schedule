import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { DailyTimeMeridiemRadio } from "./daily-time-medium-radio";
import { TimeMeridiemString, YoubiString } from "./types-week-time-edit";
import { DailyTimeSelectBox } from "./daily-time-select-box";
import { SelectChangeEvent } from "@app/event-types-alias";
import {
  MinutesString,
  HourString,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types-week-time-edit";

export const DailyTimeEdit: FC<{
  youbi: YoubiString;
  timeMedium: TimeMeridiemString;
  selectedTimes: {
    hour: HourString;
    minutes: MinutesString;
  };
  onChangeTimeMedium: (changeMediumString: YoubiString) => void; // AM/PMが変更された位置情報は曜日で管理する
  onChangeTimeHour: (event: SelectChangeEvent) => void;
  onChangeMinutes: (event: SelectChangeEvent) => void;
}> = ({
  youbi,
  timeMedium,
  selectedTimes,
  onChangeTimeHour,
  onChangeMinutes,
  onChangeTimeMedium,
}) => {
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
          onRadioChange={onChangeTimeMedium}
        />
      </Flex>
      {
        // 時間のセレクトボックス
      }
      <DailyTimeSelectBox
        hours={HALF_HOUR_TUPLE}
        selected={selectedTimes}
        onChangeTimeHour={onChangeTimeHour}
        onChangeMinutes={onChangeMinutes}
      />
    </>
  );
};
