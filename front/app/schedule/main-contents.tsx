"use client";
/**
 * @module schedule/page
 */
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
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
import {
  findTimeTypePattern,
  findTimeZones,
  saveTimeTypePattern,
} from "./schedule-repository";
import { Tb12Hours } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { ImEarth } from "react-icons/im";
import { IconType } from "react-icons";
import { VscDebugStart } from "react-icons/vsc";

export const MainContents = () => {
  /**
   * 日付に関する状態を扱う
   */
  const [scheduleState, scheduleDispatch] = useReducer(
    ScheduleReducer,
    _scheduleState,
    () => {
      _scheduleState.timeZones = findTimeZones();
      _scheduleState.timeTypePattern = findTimeTypePattern();
      return _scheduleState;
    }
  );

  const handleClickCopyButton = (): string => {
    return toCopiedTextList(scheduleState.timeZoneSchedule);
  };

  const middleHeading = (title: string, icon: IconType, boxSize = 4) => {
    return (
      <Heading as="h3" size="sm" ml={"1.5em"} width={"7em"}>
        <Icon as={icon} boxSize={boxSize} mr="0.3em" />
        {title}
      </Heading>
    );
  };

  useEffect(() => {
    saveTimeTypePattern(scheduleState.timeTypePattern);
  }, [scheduleState.timeTypePattern]);
  
  const onChangeSelectTimeType = (nextValue: string): void => {
    scheduleDispatch({
      type: "DECIDE_TIME_TYPE_PATTERN",
      timeTypePattern: nextValue as ScheduleState["timeTypePattern"],
    });
  };

  return (
    <Grid placeContent="center" w={"100vw"}>
      <Box>
        <Heading as="h1" size="xl" alignSelf="center">
          VTubeWorld Scheduler
        </Heading>
      </Box>
      {
        // １週間分のスケジュール設定
      }
      <HStack alignSelf="start" my={"2"}>
        <Icon as={LuSettings} boxSize={6} />{" "}
        <Heading as="h2" size="md">
          Setting
        </Heading>
      </HStack>
      <HStack alignSelf={"start"} align="start">
        {middleHeading("StartDate", VscDebugStart)}
        <WeekDayRange
          weekStartDate={scheduleState.weekStartDate}
          scheduleDispatch={scheduleDispatch}
        />
      </HStack>
      {
        // タイムゾーンの設定
      }
      <HStack alignSelf={"start"} align="start">
        {middleHeading("TimeZone", ImEarth)}
        <TimeZoneSetting
          timeZones={scheduleState.timeZones}
          scheduleDispatch={scheduleDispatch}
        />
      </HStack>
      <HStack alignSelf={"start"} align="flex-start">
        {middleHeading("TimeType", Tb12Hours)}
        {scheduleState.timeTypePattern}
        <Stack direction="column">
          <Button
            size={"sm"}
            colorScheme={"purple"}
            variant={
              scheduleState.timeTypePattern === "AM/PM" ? undefined : "outline"
            }
            onClick={() => onChangeSelectTimeType("AM/PM")}
          >
            AM/PM
          </Button>
          <Button
            size={"sm"}
            colorScheme={"purple"}
            variant={
              scheduleState.timeTypePattern === "24h" ? undefined : "outline"
            }
            onClick={() => onChangeSelectTimeType("24h")}
          >
            24h
          </Button>
        </Stack>
      </HStack>
      <HStack alignSelf="start" mt="8" mb="4">
        <Icon as={IoCalendarOutline} boxSize={6} />{" "}
        <Heading as="h2" size="md" mr={"50%"}>
          WeeklySchedule
        </Heading>
        <CopyButton
          copyText="All Copy"
          width="100px"
          handleClickCopyButton={handleClickCopyButton}
        />
      </HStack>
      <Box ml={"1.5em"}>
        <WeekSchedule
          timeTypePattern={scheduleState.timeTypePattern}
          weekDateTimes={scheduleState.weekDateTimes}
          timeZoneSchedule={scheduleState.timeZoneSchedule}
          scheduleDispatch={scheduleDispatch}
        />
      </Box>
    </Grid>
  );
};
