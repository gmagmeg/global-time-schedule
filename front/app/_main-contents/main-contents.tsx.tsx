/**
 * @module _main-contents/main-contents
 */

import { Box, Grid, Menu } from "@chakra-ui/react";
import { FC } from "react";
import { GlobalMenu } from "../_global-menu/global-menu";
import { WeekSchedule } from "../_week-schedule/week-schedule";

export const MainContents: FC = () => {
  return (
    <Grid templateColumns="1fr" gap={6}>
      <GlobalMenu />
      {/* WeekSchedule コンポーネントをスクロール可能にするためのラッパー要素 */}
      <Box overflowY="auto" maxHeight={"60%"}>
        <WeekSchedule startDate="2023-11-26" />
      </Box>
    </Grid>
  );
};
