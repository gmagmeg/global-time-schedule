/**
 * @module @app/_main-contents/main-contents.tsx
 */

import { Box, Grid, Menu } from "@chakra-ui/react";
import { FC } from "react";
import { GlobalMenu } from "../_global-menu/global-menu";
import { WeekSchedule } from "../_week-schedule/week-schedule";

export const MainContents: FC = () => {
  return (
    <Grid>
      <Menu strategy="fixed">
    <GlobalMenu />
    </Menu>
    <Box mt={8}>
    <WeekSchedule startDate="2023-11-26" />
    </Box>
    </Grid>
  );
};

