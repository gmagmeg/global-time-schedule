/**
 * @module _global-menu
 */

import { FC, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { SearchTimeZone } from "./search-time-zone";

import { SelectStartDate } from "./select-start-date";
import { SelectWeekDays } from "./select-week-days";
import { CopyButton } from "../_common-button/copy-button";
import { DateString } from "@/library/type-date";
import { customDayjs } from "@/library/dayjs";

export const GlobalMenu: FC = () => {
  const selectedStartDate = customDayjs("2023-11-26").format("MM/DD");

  const [selectDate, setSelectDate] = useState("2023-11-26");
  const handleSelectDate = (nextValue: DateString) => {
    setSelectDate(nextValue);
  };

  return (
    <>
      <Box bgColor={"#B4C6EA"} px={4} roundedTopLeft={12} roundedTopRight={12}>
        <SearchTimeZone />
      </Box>
      <Box mt={1}>
        <SelectStartDate
          selectedStartDate={selectDate}
          handleStartDate={handleSelectDate}
        />
      </Box>
      <SimpleGrid minChildWidth="1rem" spacing="40px" p={2} mt={1}>
        <SelectWeekDays
          baseDate={selectedStartDate}
          selectedDate={selectedStartDate}
        />
        <CopyButton enableCopy={true} content="全件コピー" />
      </SimpleGrid>
    </>
  );
};
