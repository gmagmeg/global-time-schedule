/**
 * @module _week-day-range
 */

import {
  Icon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { DateString } from "@lib/type-date";
import { customDayjs } from "@/library/dayjs";

type MoveDateRange = "prev" | "next";

export const SelectStartDate: FC<{
  selectedStartDate: DateString;
  handleStartDate: (nextValue: string) => void;
}> = ({ selectedStartDate, handleStartDate }) => {

  /**
   * 選択日を基準とした、開始日のリストを作成する
   */
  const createStartDateList = (currentDate: string): {
    sun: {
      display: string;
      value: string;
    },
    mon: {
      display: string;
      value: string
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
        }
      },
      {
        sun: {
          display: baseDate.format("MM/DD"),
          value: baseDate.format("YYYY-MM-DD"),
        },
        mon: {
          display: baseDate.add(1, "day").format("MM/DD"),
          value: baseDate.add(1, "day").format("YYYY-MM-DD"),
        }
      },
      {
        sun: {
          display: baseDate.add(1, "week").format("MM/DD"),
          value: baseDate.add(1, "week").format("YYYY-MM-DD"),
        },
        mon: {
          display: baseDate.add(8, "day").format("MM/DD"),
          value: baseDate.add(8, "day").format("YYYY-MM-DD"),
        }
      },
    ];
  };

  /**
   * 左右の矢印をクリックして、日付の範囲を変更する場合の処理
   */
  const handleClickMoveDateRange = (moveType: MoveDateRange, selectedStartDate: DateString): undefined => {
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

    handleStartDate(moveDate);
  };

  return (
    <RadioGroup value={selectedStartDate} onChange={handleStartDate} size={"lg"}>
      <Stack direction="row" justifyContent={"space-between"}>
        <Icon
          onClick={() => handleClickMoveDateRange("prev", selectedStartDate)}
          as={BiFirstPage}
          boxSize={6}
          mr={4}
        />
        {/** 週の開始日選択肢 */}
        {createStartDateList(selectedStartDate).map((startDate) => (
          <VStack key={startDate.sun.value}>
            <Radio value={startDate.sun.value}>
              <Text color="red">{startDate.sun.display}（日）</Text>
            </Radio>
            <Radio value={startDate.mon.value}>{startDate.mon.display}（月）</Radio>
          </VStack>
        ))}
        <Icon
          onClick={() => handleClickMoveDateRange("next", selectedStartDate)}
          as={BiLastPage}
          boxSize={6}
          ml={4}
        />
      </Stack>
    </RadioGroup>
  );
};
