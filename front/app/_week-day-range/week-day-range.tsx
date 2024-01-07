/**
 * @module _week-day-range
 */

import { Box, Radio, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react";
import { DateString, toDateString } from "@/library/type-date";
import { ScheduleAction } from "../schedule/hooks/schedule-reducer";
import { customDayjs } from "@/library/dayjs";
import { Dayjs } from "dayjs";
import { moveToNextSunday } from "@/hooks/time-zone-function";

export const WeekDayRange = ({
  weekStartDate,
  scheduleDispatch,
}: {
  weekStartDate: DateString;
  scheduleDispatch: (action: ScheduleAction) => void;
}) => {
  const addDate = (baseDate: Dayjs, addDay: number) => {
    return {
      sun: {
        display: baseDate.add(addDay, "day").format("MM/DD"),
        value: baseDate.add(addDay, "day").format("YYYY-MM-DD"),
      },
      mon: {
        display: baseDate.add(addDay + 1, "day").format("MM/DD"),
        value: baseDate.add(addDay + 1, "day").format("YYYY-MM-DD"),
      },
    };
  };

  /**
   * 選択日を基準とした、開始日のリストを作成する
   */
  const createStartDateList = (): {
    sun: {
      display: string;
      value: string;
    };
    mon: {
      display: string;
      value: string;
    };
  }[] => {
    const baseDate = customDayjs(moveToNextSunday());

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
      addDate(baseDate, 0),
      addDate(baseDate, 7),
      addDate(baseDate, 14),
    ];
  };

  const onChangeWeekStartDate = (weekStartDate: string): void => {
    scheduleDispatch({
      type: "DECIDE_SCHEDULE_START_DATE",
      weekStartDate: toDateString(weekStartDate),
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
            {/** 週の開始日選択肢 */}
            {createStartDateList().map((startDate) => (
              <VStack key={startDate.sun.value}>
                <Radio value={startDate.sun.value}>
                  <Text color="red">{startDate.sun.display}（日）</Text>
                </Radio>
                <Radio value={startDate.mon.value}>
                  {startDate.mon.display}（月）
                </Radio>
              </VStack>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
    </>
  );
};
