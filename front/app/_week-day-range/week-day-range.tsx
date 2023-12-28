/**
 * @module _week-day-range
 */

import { Box, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import { SelectStartDate } from './select-start-date';
import { DateString } from '@/library/type-date';
import { createWeekRange, customDayjs } from '@/library/dayjs';
import { DayButton } from '../_common-button/day-button';

export const WeekDayRange: FC<{
  weekStartDate: DateString;
  handleChangeWeekStartDate: (weekStartDate: DateString) => void;
}> = ({ 
  weekStartDate,
  handleChangeWeekStartDate
 }) => {

  /**
   * 日付の選択を変更した時の処理
   */
  const handleSelectDate = (selectDate: DateString) => {
    /**
     * @todo ここで年の情報が落ちていて、m/dになっている。
     * うまいこと年月日に変換したい
     */
    handleChangeWeekStartDate(selectDate);
  };

  return (
  <>
   <Box mt={1}>
    <SelectStartDate
      selectedStartDate={weekStartDate}
      handleStartDate={handleSelectDate}
    />
  </Box>
  <SimpleGrid minChildWidth="1rem" spacing="40px" p={2} mt={1}>
  {createWeekRange(weekStartDate).map((date, index) => {
    const isSelected = customDayjs(weekStartDate).isSame(date, "day");
    return (
      <DayButton
        key={index}
        date={date}
        isSelected={isSelected}
        onClick={() => {}}
      />
    );
  })}
  </SimpleGrid>
</> 
)
}