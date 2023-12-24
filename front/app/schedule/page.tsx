"use client"
/**
 * @module schedule/page
 */
import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { FC, useReducer } from "react";
import { GlobalMenu } from "../_global-menu/global-menu";
import { WeekSchedule } from "../_week-schedule/week-schedule";
import { mainContentsReducer } from "./hooks/schedule-reducer";
import { scheduleState } from "./hooks/schedule-state";
import { toTimeZoneTime } from "@app/_day-schedule/type-day-schedule"

export default function Schedule() {
  const [mainState, mainDispatch] = useReducer(
    mainContentsReducer,
    scheduleState
  );

  const { onClose } = useDisclosure();

  const onChangeTimeZone = (timeZone: string): void => {
    mainDispatch({
      type: "CHANGE_TIME_ZONE",
      timeZone: toTimeZoneTime(timeZone),
      index: 0
    });
  }

  const _onClose = (): void => {
    onClose()
  }

  return (
    <Grid templateColumns="1fr" gap={6}>
      <GlobalMenu
        timeZones={mainState.timeZones}
        handleChangeTimeZone={onChangeTimeZone}
        handleModalClose={_onClose}
      />
      {/* WeekSchedule コンポーネントをスクロール可能にするためのラッパー要素 */}
      <Box overflowY="auto" maxHeight={"60%"}>
        <WeekSchedule startDate="2023-11-26" />
      </Box>
    </Grid>
  );
};
