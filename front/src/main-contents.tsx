/**
 * @module schedule/page
 */
import {
  Box,
  Grid,
  HStack,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { WeekSchedule } from "./_week-schedule/week-schedule";
import {
  scheduleState as _scheduleState,
  ScheduleReducer,
  TimeTypePattern,
  TimeZoneAbb,
  TimeZoneKey,
  toTimeTypePattern,
  toTimeZoneAbb,
  } from "./hooks/schedule-reducer";
import { TimeZoneSetting } from "./_time-zone-setting/time-zone-setting";
import { WeekDayRange } from "./_week-day-range/week-day-range";
import { CopyButton } from "./_common-button/copy-button";
import { toCopiedTextList } from "./hooks/schedule-reducer-function";
import { Tb12Hours } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { ImEarth } from "react-icons/im";
import { IconType } from "react-icons";
import { VscDebugStart } from "react-icons/vsc";
import { findTimeZones, saveTimeTypePattern, saveTimeZones } from "./schedule-repository";
import { TimeType } from "./setting/time-type";

export const MainContents = () => {
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

  const middleHeading = (title: string, icon: IconType, boxSize = 4) => {
    return (
      <Heading as="h3" size="sm" ml={"1.5em"} width={"7em"}>
        <Icon as={icon} boxSize={boxSize} mr="0.3em" />
        {title}
      </Heading>
    );
  };

  /////////////////////////////////////////////////////////////////
  /**
   * useStateとuseEffectを使って、ブラウザが存在する状態を確定させたうえで、
   * storageデータの取得と保存を行っています。
   * この対応をしないでreducerの中に含めてしまうと、SSCでブラウザがない状態で実行されて、エラーが発生するので、このように書いています。
   */
  const [updatedTimeZone, setUpdateTimeZone] = useState<{abb: TimeZoneAbb, key: TimeZoneKey}>(
    {
      key: "none",
      abb: toTimeZoneAbb("none"),
  });
  useEffect(() => {
    const storageTimeZone = findTimeZones();
    saveTimeZones(storageTimeZone, updatedTimeZone.key, updatedTimeZone.abb);
  }, [updatedTimeZone]);

  const [updatedTimeTypePattern, setUpdatedTimeTypePattern] = useState<TimeTypePattern>(toTimeTypePattern("AM/PM"));
  useEffect(() => {
    saveTimeTypePattern(updatedTimeTypePattern);
  }, [updatedTimeTypePattern]);

  /////////////////////////////////////////////////////////////////

  return (
    <Grid placeContent="center" w={"100vw"} style={{ backgroundColor: 'white' }}>
      <Box>
        <Heading as="h1" size="xl" alignSelf="center">
          VTuber's Stream Scheduler
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
          setUpdateTimeZone={setUpdateTimeZone}
          scheduleDispatch={scheduleDispatch}
        />
      </HStack>
      <HStack alignSelf={"start"} align="flex-start">
        {middleHeading("TimeType", Tb12Hours)}
        <TimeType 
          timeTypePattern={scheduleState.timeTypePattern}
          setUpdatedTimeTypePattern={setUpdatedTimeTypePattern}
          scheduleDispatch={scheduleDispatch}
        />
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
