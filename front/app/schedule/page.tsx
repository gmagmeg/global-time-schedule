"use client";
/**
 * @module schedule/page
 */
import { Box, Flex, Grid, HStack, Heading, Icon, Select } from "@chakra-ui/react";
import { useReducer } from "react";
import { WeekSchedule } from "../_week-schedule/week-schedule";
import {
  scheduleState as _scheduleState,
  ScheduleReducer,
  ScheduleState,
} from "./hooks/schedule-reducer";
import { timeZoneState as _timeZoneState } from "@hooks/time-zone-reducer";
import { TimeZoneSetting } from "../_time-zone-setting/time-zone-setting";
import { WeekDayRange } from "../_week-day-range/week-day-range";
import { CopyButton } from "../_common-button/copy-button";
import { toCopiedTextList } from "./hooks/schedule-reducer-function";
import { FaRegHandPointRight } from "react-icons/fa";

export default function Schedule() {
  /**
   * 日付に関する状態を扱う
   */
  const [scheduleState, scheduleDispatch] = useReducer(
    ScheduleReducer,
    _scheduleState
  );

  const handleClickCopyButton = (): string => {
    return toCopiedTextList(scheduleState.timeZoneSchedule);
  };

  const onChangeSelectTimeType = (
    nextValue: string,
  ): void => {
    
    scheduleDispatch({
      type: "DECIDE_TIME_TYPE_PATTERN",
      timeTypePattern: nextValue as ScheduleState["timeTypePattern"],
    })
  }

  const stepHeading = (step: number, text: string) => {
    return (
      <Heading
        size="sm"
        p={4}
        pb={2}
        mb={4}
        borderBottom="2px"
        borderColor="blue.500"
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Icon as={FaRegHandPointRight} color="blue.500" w={6} h={6} />
        STEP {step}
        <br />
        {text}
      </Heading>
    );
  };

  return (
    <Grid templateColumns="1fr" gap={3}>
      <Box bgColor={"#B4C6EA"}>
        <Heading as={"h1"}>ここにロゴを入れる</Heading>
        {/* <Image src="/sitelogo.png" width={500} height={100} alt={"VTubeWorld Scheduler"} /> */}
      </Box>
      <HStack spacing={8} align="flex-start">
        <Box>
          {stepHeading(1, "開始日の設定")}
          <WeekDayRange
            weekStartDate={scheduleState.weekStartDate}
            scheduleDispatch={scheduleDispatch}
          />
        </Box>
        {
          // タイムゾーンの設定
        }
        <Box>
          {stepHeading(2, "タイムゾーンの設定")}
          <TimeZoneSetting
            timeZones={scheduleState.timeZones}
            scheduleDispatch={scheduleDispatch}
          />
        </Box>
        <Box>
          {stepHeading(3, "スケジュールの設定")}
          <Flex mb={4}>
            ここRadioボタンにする
            <Select 
              maxW={"110px"} onChange={(event) => onChangeSelectTimeType(event.target.value)}>
              <option value='AM/PM'>AM/PM</option>
              <option value='24h'>24h</option>
            </Select>
            <CopyButton
              copyText="全件コピー"
              width="10%"
              handleClickCopyButton={handleClickCopyButton}
            />
          </Flex>
          {
            // １週間分のスケジュール設定
          }
          <WeekSchedule
            timeTypePattern={scheduleState.timeTypePattern}
            weekDateTimes={scheduleState.weekDateTimes}
            timeZoneSchedule={scheduleState.timeZoneSchedule}
            scheduleDispatch={scheduleDispatch}
          />
        </Box>
      </HStack>
    </Grid>
  );
}
