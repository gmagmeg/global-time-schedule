import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { DateString } from "./type-global-menu";
import { customDayjs } from "@lib/dayjs";
import { Dayjs } from "dayjs";

export const SelectWeekDays: FC<{baseDate: DateString}> = ({baseDate}) => {

// 1週間分の日付を格納する配列
const weekRange = (day: DateString): Dayjs[] => {
  const baseDate = customDayjs(day);
  const array = [];
  for (let i = 1; i <= 7; i++) {
      array.push(baseDate.add(i, 'day'));
  }

  return array;
}

return (
  <>
  {weekRange(baseDate).map((date, index) => (
    <Button colorScheme='gray' color={"GrayText"} key={index}>{date.format('ddd')}<br />{date.format('D')}</Button>
  ))}
  </>);
};

