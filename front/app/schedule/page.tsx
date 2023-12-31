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
import {
  timeZoneState as _timeZoneState,
  toTimeZone,
} from "@hooks/time-zone-reducer";
import { TimeZoneSetting } from "../_time-zone-setting/time-zone-setting";
import { WeekDayRange } from "../_week-day-range/week-day-range";
import { TimeZoneTimes } from "../_time-zone-time/time-zone-times";

export default function Schedule() {
  /**
   * 日付に関する状態を扱う
   */
  const [scheduleState, scheduleDispatch] = useReducer(
    ScheduleReducer,
    _scheduleState
  );

  /**
   * タイムゾーンの変更
   */
  const onChangeTimeZone = (
    changeTimezoneIndex: number,
    timeZone: string
  ): void => {
    scheduleDispatch({
      type: "CHANGE_TIME_ZONE",
      timeZone: toTimeZone(timeZone),
      index: changeTimezoneIndex,
    });
  };

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
        // @todo フォーマットをオブジェクト形式に変更する
      }
      <TimeZoneSetting
        handleChangeTimeZone={onChangeTimeZone}
        timeZones={scheduleState.timeZones}
      />
      {
        // １週間分のスケジュール設定
      }
      <WeekSchedule
        weekStartDate={scheduleState.weekStartDate}
        weekDateTimes={scheduleState.weekDateTimes}
        scheduleDispatch={scheduleDispatch}
      />
      {/* <TimeZoneTimes /> */}
    </Grid>
  );
}
