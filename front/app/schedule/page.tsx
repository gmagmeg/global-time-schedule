"use client";
/**
 * @module schedule/page
 */
import { Box, Grid, Heading } from "@chakra-ui/react";
import { useReducer } from "react";
import { WeekSchedule } from "../_week-schedule/week-schedule";
import {
  scheduleState as _scheduleState,
  ScheduleReducer,
} from "./hooks/schedule-reducer";
import { timeZoneState as _timeZoneState } from "@hooks/time-zone-reducer";
import { TimeZoneSetting } from "../_time-zone-setting/time-zone-setting";
import { WeekDayRange } from "../_week-day-range/week-day-range";

export default function Schedule() {
  /**
   * 日付に関する状態を扱う
   */
  const [scheduleState, scheduleDispatch] = useReducer(
    ScheduleReducer,
    _scheduleState
  );

  return (
    <Grid templateColumns="1fr" gap={3}>
      <Box bgColor={"#B4C6EA"}>
        <Heading as={"h1"}>ここにロゴを入れる</Heading>
        {/* <Image src="/sitelogo.png" width={500} height={100} alt={"VTubeWorld Scheduler"} /> */}
      </Box>
      <WeekDayRange
        weekStartDate={scheduleState.weekStartDate}
        scheduleDispatch={scheduleDispatch}
      />
      {
        // タイムゾーンの設定
      }
      <TimeZoneSetting
        timeZones={scheduleState.timeZones}
        scheduleDispatch={scheduleDispatch}
      />
      {
        // １週間分のスケジュール設定
      }
      <WeekSchedule
        weekStartDate={scheduleState.weekStartDate}
        weekDateTimes={scheduleState.weekDateTimes}
        timeZoneSchedule={scheduleState.timeZoneSchedule} 
        scheduleDispatch={scheduleDispatch}
      />
    </Grid>
  );
}
