/**
 * @module _global-menu
 */

import { Box, Icon, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { StartDate, toDateString } from "./type-global-menu";
import { DateString } from "@lib/type-date";
import { customDayjs } from "@/library/dayjs";

type MoveDateRange = "prev" | "next";

export const SelectStartDate: FC<{
  selectedStartDate: DateString;
  handleStartDate: (nextValue: string) => void;
}> = ({ selectedStartDate, handleStartDate }) => {
  const selectedDay = customDayjs(selectedStartDate).format("MM/DD");

  /**
   * 選択日を基準とした、開始日のリストを作成する
   */
  const createStartDateList = (currentDate: string): StartDate[] => {
    const currentDayjs = customDayjs(currentDate);
    const baseDate =
      currentDayjs.weekday() === 0 ? currentDayjs : currentDayjs.weekday(0);

    return [
      {
        sun: baseDate.subtract(1, "week").format("MM/DD"),
        mon: baseDate.subtract(6, "day").format("MM/DD"),
      },
      {
        sun: baseDate.format("MM/DD"),
        mon: baseDate.add(1, "day").format("MM/DD"),
      },
      {
        sun: baseDate.add(1, "week").format("MM/DD"),
        mon: baseDate.add(8, "day").format("MM/DD"),
      },
    ];
  };
  const [startDateRange, setStartDateRange] = useState(
    createStartDateList(selectedStartDate)
  );

  /**
   * 開始日を変更したときの処理
   */
  const onChange = (nextValue: string) => {
    handleStartDate(toDateString(nextValue));
  };

  /**
   * 左右の矢印をクリックして、日付の範囲を変更する場合の処理
   */
  const handleClickMoveDateRange = (moveType: MoveDateRange): undefined => {
    let moveDate = selectedStartDate;
    if (moveType === "prev") {
      moveDate = customDayjs(selectedStartDate)
        .subtract(1, "week")
        .format("YYYY-MM-DD");
    } else {
      moveDate = customDayjs(selectedStartDate)
        .add(1, "week")
        .format("YYYY-MM-DD");
    }

    setStartDateRange(createStartDateList(moveDate));
    handleStartDate(moveDate);
  };

  return (
    <RadioGroup value={selectedDay} onChange={onChange} size={"lg"}>
      <Stack direction="row" justifyContent={"space-between"}>
        <Icon
          onClick={() => handleClickMoveDateRange("prev")}
          as={BiFirstPage}
          boxSize={6}
          mr={4}
        />
        {startDateRange.map((startDate, index) => (
          <Box key={startDate.sun}>
            <Radio value={startDate.sun} mr={2}>
              <Text color="red">{startDate.sun}（日）</Text>
            </Radio>
            <Radio value={startDate.mon}>{startDate.mon}（月）</Radio>
          </Box>
        ))}
        <Icon
          onClick={() => handleClickMoveDateRange("next")}
          as={BiLastPage}
          boxSize={6}
          ml={4}
        />
      </Stack>
    </RadioGroup>
  );
};
