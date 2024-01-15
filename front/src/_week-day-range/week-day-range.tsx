/**
 * @module _week-day-range
 */

import { Button, Flex, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { DateString, toDateString } from "@/library/type-date";
import { ScheduleAction, moveToNextSunday } from "../hooks/schedule-reducer";
import { customDayjs } from "@/library/dayjs";
import { Dayjs } from "dayjs";

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
    ];
  };

  const onChangeWeekStartDate = (weekStartDate: string): void => {
    scheduleDispatch({
      type: "DECIDE_SCHEDULE_START_DATE",
      weekStartDate: toDateString(weekStartDate),
    });
  };

  return (
    <RadioGroup
      key={weekStartDate}
      value={weekStartDate}
      onChange={onChangeWeekStartDate}
      size={"sm"}
    >
      <Flex>
        {/** 週の開始日選択肢 */}
        {createStartDateList().map((startDate) => (
          <Stack key={startDate.sun.value} w={"170px"}>
            <Button
              w={"80%"}
              onClick={() => onChangeWeekStartDate(startDate.sun.value)}
              colorScheme={"purple"}
              size={"sm"}
              variant={
                [startDate.sun.value, startDate.mon.value].includes(
                  weekStartDate
                )
                  ? undefined
                  : "outline"
              }
            >
              {startDate.sun.value}～
            </Button>
            <Radio value={startDate.sun.value} colorScheme="purple">
              <Text fontSize="md" color="red">
                {startDate.sun.display}(Sun)
              </Text>
            </Radio>
            <Radio mb={4} value={startDate.mon.value}>
              <Text fontSize="md">{startDate.mon.display}(Mon)</Text>
            </Radio>
          </Stack>
        ))}
      </Flex>
    </RadioGroup>
  );
};
