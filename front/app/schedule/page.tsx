"use client";
/**
 * @module schedule/page
 */
import { Box, Grid, Heading } from "@chakra-ui/react";
import { useReducer } from "react";
import { WeekSchedule } from "../_week-schedule/week-schedule";
import {
  scheduleDateState as _scheduleDateState,
  ScheduleDateReducer,
} from "@hooks/schedule-date-reducer";
import {
  TimeZoneReducer,
  timeZoneState as _timeZoneState,
  toTimeZone,
} from "@hooks/time-zone-reducer";
import { DateString, HourMinutesFormat, toDateString, toHourMinutesFormat } from "@/library/type-date";
import { TimeZoneSetting } from "../_time-zone-setting/time-zone-setting";
import { WeekDayRange } from "../_week-day-range/week-day-range";

export default function Schedule() {
  /**
   * タイムゾーンに関する状態を扱う
   */
  const [timeZoneState, timeZoneDispatch] = useReducer(
    TimeZoneReducer,
    _timeZoneState
  );

  /**
   * 日付に関する状態を扱う
   */
  const [scheduleDateState, scheduleDateDispatch] = useReducer(
    ScheduleDateReducer,
    _scheduleDateState
  );
  const onChangeWeekStartDate = (weekStartDate: string): void => {
    scheduleDateDispatch({
      type: "DECIDE_SCHEDULE_START_DATE",
      weekStartDate: toDateString(weekStartDate),
    });
  };


  /**
   * タイムゾーン関連の処理
   */
  const onChangeTimeZone = (
    changeTimezoneIndex: number,
    timeZone: string
  ): void => {
    timeZoneDispatch({
      type: "CHANGE_TIME_ZONE",
      timeZone: toTimeZone(timeZone),
      index: changeTimezoneIndex,
    });
  };

  const onChangeHourMinutes = (
    date: DateString,
    hourMinutes: HourMinutesFormat,
  ): void => {
    
    timeZoneDispatch({
      type: "CHANGE_HOUR_MINUTES",
      date,
      hourMinutes: hourMinutes,
    });
  }

  return (
    <Grid templateColumns="1fr" gap={3}>
      <Box bgColor={"#B4C6EA"}>
        <Heading as={"h1"}>ここにロゴを入れる</Heading>
        {/* <Image src="/sitelogo.png" width={500} height={100} alt={"VTubeWorld Scheduler"} /> */}
      </Box>
      {/** TimeZoneSettingの中をうまいこと整理しながら、reducerの再定義 */}
      
      {/* handleChangeWeekStartDate={onChangeWeekStartDate} */}
      {/* handleModalClose={_onClose} */}
      {/* WeekSchedule コンポーネントをスクロール可能にするためのラッパー要素 */}
      <WeekDayRange
        weekStartDate={scheduleDateState.weekStartDate}
        handleChangeWeekStartDate={onChangeWeekStartDate}
      />
      {
        /** １週間の詳細なスケジュール設定 */
      }
      <TimeZoneSetting
        handleChangeTimeZone={onChangeTimeZone}
        timeZones={timeZoneState.timeZones}
      />
      <WeekSchedule
        weekStartDate={scheduleDateState.weekStartDate}
        handleChangeWeekStartDate={onChangeWeekStartDate}
        timeZoneDispatch={timeZoneDispatch}
      />
    </Grid>
  );
}
