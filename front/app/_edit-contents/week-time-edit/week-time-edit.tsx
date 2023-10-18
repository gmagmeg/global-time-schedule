import { FC, useReducer } from "react";
import "@app/globals.css";
import { TimeMeridiemUnion } from "@editContents/week-time-edit/types/time-meridiem-radio";
import {
  HourUnion,
  MinutesUnion,
} from "@editContents/week-time-edit/types/time-select-box";
import { DailyTimeEdit } from "./daily-time-edit";
import {
  WeekUnion,
  WeekTuple,
} from "@editContents/week-time-edit/types/week-time-edit";
import {
  Box,
  Grid,
  GridItem,
  List,
  ListIcon,
  ListItem,
  Select,
} from "@chakra-ui/react";
import { HourOption as HourOptionType } from "@editContents/week-time-edit/types/hour-option";
import { HourOption } from "@editContents/week-time-edit/hour-option";
import { weekEditReducer, initialReduceState } from "./hooks/week-time-reducer";
import { AiOutlineSchedule } from "react-icons/ai";

type WeekTimeEditProps = {
  week: WeekTuple;
};

export const WeekTimeEdit: FC<WeekTimeEditProps> = ({
  week, // 日、月の開始日の設定によって変動するため、propsで渡す
}) => {
  const [reducerState, reducerDispatch] = useReducer(
    weekEditReducer,
    initialReduceState
  );

  /**
   * 12時間制と24時間制の切り替え
   */
  const handleHourOption = (hourOption: HourOptionType) => {
    reducerDispatch({ type: "CHANGE-HOUR-OPTION", hourOption });
  };

  /**
   * 各曜日の時間選択
   */
  // 時：分の「時」部分の変更時の更新処理
  const handleChangeHour = (targetYoubi: WeekUnion, changedHour: HourUnion) => {
    reducerDispatch({ type: "CHANGE-TIME-HOUR", targetYoubi, changedHour });
  };

  // 時：分の「分」部分の変更時の更新処理
  const handleMinutes = (
    targetYoubi: WeekUnion,
    changedMinutes: MinutesUnion
  ) => {
    reducerDispatch({
      type: "CHANGE-TIME-MINUTES",
      targetYoubi,
      changedMinutes,
    });
  };

  // AM/PMの切り替え
  const handleChangeTimeMeridiem = (
    targetYoubi: WeekUnion,
    changedTimeMeridiem: TimeMeridiemUnion
  ) => {
    reducerDispatch({
      type: "CHANGE-TIME-MERIDIEM",
      targetYoubi,
      changedTimeMeridiem,
    });
  };

  return (
    <>
      <HourOption
        checked={reducerState.hourOption}
        onChange={handleHourOption}
      />
      <Box
        mt={4}
        className="week-time-select"
      >
        {week.map((youbi, index) => (
          <DailyTimeEdit
            key={youbi}
            targetYoubi={youbi}
            timeMeridiem={{
              checked: reducerState.timeSelectBox[index].selectedTimeMeridiem,
              hoursOption: reducerState.hourOption,
              targetYoubi: youbi,
              onChange: handleChangeTimeMeridiem,
            }}
            timeSelectBox={{
              targetYoubi: youbi,
              hours: reducerState.hoursSelectOption,
              selected: {
                hour: reducerState.timeSelectBox[index].selectedHour,
                minutes: reducerState.timeSelectBox[index].selectedMinutes,
              },
              onChangeHour: handleChangeHour,
              onChangeMinutes: handleMinutes,
            }}
          />
        ))}
      </Box>
      <Box>
          <Select>
            <option>タイムゾーン</option>
            <option>タイムゾーン</option>
            <option>タイムゾーン</option>
          </Select>
          <Select>
            <option>タイムゾーン</option>
            <option>タイムゾーン</option>
            <option>タイムゾーン</option>
          </Select>
          <Select>
            <option>タイムゾーン</option>
            <option>タイムゾーン</option>
            <option>タイムゾーン</option>
          </Select>
        <List>
          <ListItem>
            <ListIcon as={AiOutlineSchedule} verticalAlign={"baseline"} />
            タイムゾーン 01:11 AM
          </ListItem>
          <ListItem ml={6}>タイムゾーン 03:33 AM</ListItem>
          <ListItem ml={6}>未設定パターン --:-- --</ListItem>
          <ListItem ml={6}>未設定パターン --:-- --</ListItem>
        </List>
        <List>
          <ListItem>
            <ListIcon as={AiOutlineSchedule} verticalAlign={"baseline"} />
            タイムゾーン 01:11 AM
          </ListItem>
          <ListItem ml={6}>タイムゾーン 03:33 AM</ListItem>
          <ListItem ml={6}>未設定パターン --:-- --</ListItem>
          <ListItem ml={6}>未設定パターン --:-- --</ListItem>
        </List>
        <List>
          <ListItem>
            <ListIcon as={AiOutlineSchedule} verticalAlign={"baseline"} />
            タイムゾーン 01:11 AM
          </ListItem>
          <ListItem ml={6}>タイムゾーン 03:33 AM</ListItem>
          <ListItem ml={6}>未設定パターン --:-- --</ListItem>
          <ListItem ml={6}>未設定パターン --:-- --</ListItem>
        </List>
      </Box>
    </>
  );
};
