/**
 * @module _week-day-range
 */

import {
  Box,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { DateString, toDateString } from "@/library/type-date";
import { ScheduleAction } from "../schedule/hooks/schedule-reducer";
import { customDayjs } from "@/library/dayjs";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

export const WeekDayRange: FC<{
  weekStartDate: DateString;
  scheduleDispatch: (action: ScheduleAction) => void;
}> = ({ weekStartDate, scheduleDispatch }) => {
  /**
   * 選択日を基準とした、開始日のリストを作成する
   */
  const createStartDateList = (
    currentDate: string
  ): {
    sun: {
      display: string;
      value: string;
    };
    mon: {
      display: string;
      value: string;
    };
  }[] => {
    const currentDayjs = customDayjs(currentDate);
    const baseDate =
      currentDayjs.weekday() === 0 ? currentDayjs : currentDayjs.weekday(0);

    return [
      {
        sun: {
          display: baseDate.subtract(1, "week").format("MM/DD"),
          value: baseDate.subtract(1, "week").format("YYYY-MM-DD"),
        },
        mon: {
          display: baseDate.subtract(6, "day").format("MM/DD"),
          value: baseDate.subtract(6, "day").format("MM/DD"),
        },
      },
      {
        sun: {
          display: baseDate.format("MM/DD"),
          value: baseDate.format("YYYY-MM-DD"),
        },
        mon: {
          display: baseDate.add(1, "day").format("MM/DD"),
          value: baseDate.add(1, "day").format("YYYY-MM-DD"),
        },
      },
      {
        sun: {
          display: baseDate.add(1, "week").format("MM/DD"),
          value: baseDate.add(1, "week").format("YYYY-MM-DD"),
        },
        mon: {
          display: baseDate.add(8, "day").format("MM/DD"),
          value: baseDate.add(8, "day").format("YYYY-MM-DD"),
        },
      },
    ];
  };

  const onChangeWeekStartDate = (weekStartDate: string): void => {
    scheduleDispatch({
      type: "DECIDE_SCHEDULE_START_DATE",
      weekStartDate: toDateString(weekStartDate),
    });
  };

  /**
   * 左右の矢印をクリックして、日付の範囲を変更する場合の処理
   */
  const handleClickMoveDateRange = (
    moveType: "prev" | "next",
    selectedStartDate: DateString
  ): undefined => {
    let moveDate: string;
    if (moveType === "prev") {
      moveDate = customDayjs(selectedStartDate)
        .subtract(1, "week")
        .format("YYYY-MM-DD");
    } else {
      moveDate = customDayjs(selectedStartDate)
        .add(1, "week")
        .format("YYYY-MM-DD");
    }

    scheduleDispatch({
      type: "DECIDE_SCHEDULE_START_DATE",
      weekStartDate: toDateString(moveDate),
    });
  };

  return (
    <>
      <Box mt={1}>
        <RadioGroup
          value={weekStartDate}
          onChange={onChangeWeekStartDate}
          size={"lg"}
        >
          <Stack direction="row" justifyContent={"space-between"}>
            <Icon
              onClick={() => handleClickMoveDateRange("prev", weekStartDate)}
              as={BiFirstPage}
              boxSize={6}
              mr={4}
            />
            {/** 週の開始日選択肢 */}
            {createStartDateList(weekStartDate).map((startDate) => (
              <VStack key={startDate.sun.value}>
                <Radio value={startDate.sun.value}>
                  <Text color="red">{startDate.sun.display}（日）</Text>
                </Radio>
                <Radio value={startDate.mon.value}>
                  {startDate.mon.display}（月）
                </Radio>
              </VStack>
            ))}
            <Icon
              onClick={() => handleClickMoveDateRange("next", weekStartDate)}
              as={BiLastPage}
              boxSize={6}
              ml={4}
            />
          </Stack>
        </RadioGroup>
      </Box>
    </>
  );
};
