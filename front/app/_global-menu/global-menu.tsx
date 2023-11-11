import { FC, useReducer } from "react";
import { Box } from "@chakra-ui/react";
import { SearchTimeZone } from "./search-time-zone";

import { GlobalMenuReducer } from "./hooks/global-menu-reducer";
import { GlobalMenuState } from "./hooks/global-menu-state";
import { SelectStartDate } from "./select-start-date";
import { SelectWeekDays } from "./select-week-days";

const Links = ["Dashboard", "Projects", "Team"];

export const GlobalMenu: FC = () => {
  const [globalMenuState, globalMenuDispatch] = useReducer(
    GlobalMenuReducer,
    GlobalMenuState
  );

  return (
    <>
      <Box bgColor={"#B4C6EA"} px={4} roundedTopLeft={12} roundedTopRight={12}>
        <SearchTimeZone />
      </Box>
      <Box mt={6}>
        <SelectStartDate
          startDateList={globalMenuState.startDateList}
          selectedStartDate={globalMenuState.selectedStartDate}
          handleStartDate={globalMenuDispatch}
        />
      </Box>
      <Box mt={6}>
        <SelectWeekDays 
          baseDate={globalMenuState.selectedStartDate}
          selectedDate={globalMenuState.selectedStartDate}
        />
        </Box>
    </>
  );
};
