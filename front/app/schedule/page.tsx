"use client";
/**
 * @module schedule/page
 */
import {
  Box,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Radio,
  RadioGroup,
  Select,
  Spacer,
} from "@chakra-ui/react";
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
import { VscDebugStart } from "react-icons/vsc";
import { IoTimeOutline } from "react-icons/io5";
import { GrSchedules } from "react-icons/gr";
import { IconType } from "react-icons/lib";

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

  const onChangeSelectTimeType = (nextValue: string): void => {
    scheduleDispatch({
      type: "DECIDE_TIME_TYPE_PATTERN",
      timeTypePattern: nextValue as ScheduleState["timeTypePattern"],
    });
  };

  const stepHeading = (icon: IconType, step: number, text: string) => {
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
        <Icon as={icon} color="blue.500" w={6} h={6} />
        {step}：{text}
      </Heading>
    );
  };

  return (
    <Grid templateColumns="1fr" gap={3} placeItems="center">
      <Box bgColor={"#B4C6EA"}>
        <Heading as={"h1"}>ここにロゴを入れる</Heading>
        {/* <Image src="/sitelogo.png" width={500} height={100} alt={"VTubeWorld Scheduler"} /> */}
      </Box>
      <Flex direction={"column"}>
        <WeekDayRange
          weekStartDate={scheduleState.weekStartDate}
          scheduleDispatch={scheduleDispatch}
        />
      </Flex>
      <HStack spacing={8} align="flex-start">
        <Box>
          <Flex mb={4}>
            <RadioGroup
              mr={3}
              maxW={"110px"}
              onChange={(value) => onChangeSelectTimeType(value)}
            >
              <Radio value="AM/PM">AM/PM</Radio>
              <Radio value="24h">24h</Radio>
            </RadioGroup>
            <CopyButton
              copyText="全件コピー"
              width="30%"
              handleClickCopyButton={handleClickCopyButton}
            />
          </Flex>
          {
            // １週間分のスケジュール設定
          }
          <Box
            maxH="80vh"
            overflowY="auto"
            style={{
              direction: "rtl",
            }}
          >
            <Box
              style={{
                direction: "ltr",
              }}
            >
              <WeekSchedule
                timeTypePattern={scheduleState.timeTypePattern}
                weekDateTimes={scheduleState.weekDateTimes}
                timeZoneSchedule={scheduleState.timeZoneSchedule}
                scheduleDispatch={scheduleDispatch}
              />
            </Box>
          </Box>
        </Box>
        {
          // タイムゾーンの設定
        }
        <Box mt={16}>
          <TimeZoneSetting
            timeZones={scheduleState.timeZones}
            scheduleDispatch={scheduleDispatch}
          />
        </Box>
      </HStack>
    </Grid>
  );
}
