/**
 * @module _global-menu
 */

import { FC, useState, useReducer } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { SearchTimeZone } from "./search-time-zone";

import { GlobalMenuReducer } from "./hooks/global-menu-reducer";
import { GlobalMenuState } from "./hooks/global-menu-state";
import { SelectStartDate } from "./select-start-date";
import { SelectWeekDays } from "./select-week-days";
import { CopyButton } from "../_common-button/copy-button";
import { DateString } from "@/library/type-date";

const Links = ["Dashboard", "Projects", "Team"];

export const GlobalMenu: FC = () => {
  const [globalMenuState, globalMenuDispatch] = useReducer(
    GlobalMenuReducer,
    GlobalMenuState
  );

  // 気になること
  // ここでselectedStartDateをuseStateで扱ったとき、
  // 上の階層のReducerに渡せるのか？
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
          baseDate={globalMenuState.selectedStartDate}
          selectedDate={globalMenuState.selectedStartDate}
        />
        <CopyButton enableCopy={true} content="全件コピー" />
      </SimpleGrid>
    </>
  );
};
