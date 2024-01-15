/**
 * @module time-zone-setting
 */
import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { CiTimer } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { SearchTimeZone } from "./search-time-zone";
import { ImCancelCircle } from "react-icons/im";
import {
  ScheduleAction,
  ScheduleState,
  TimeZoneAbb,
  TimeZoneKey,
  TimeZoneValue,
  TimeZones,
  toTimeZoneAbb,
} from "../hooks/schedule-reducer";
import { toKeyArray } from "@/library/common";
import { getTimeZoneValue } from "../hooks/schedule-reducer-function";
import { findTimeZones } from "../schedule-repository";

export const TimeZoneSetting = ({
  timeZones,
  setUpdateTimeZone,
  scheduleDispatch,
}: {
  timeZones: TimeZones;
  setUpdateTimeZone: (timeZone: { abb: TimeZoneAbb; key: TimeZoneKey }) => void;
  scheduleDispatch: (action: ScheduleAction) => void;
}) => {
  /**
   * 何番目のタイムゾーンを変更するかを特定するために、
   * クリックされたタイムゾーンの位置を保持する
   */
  const [selectedTimeZoneKey, setSelectedTimeZoneKey] =
    useState<TimeZoneKey>("second");

  /**
   * タイムゾーン設定モーダルの開閉を管理
   */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onModalOpen = (timeZoneKey: TimeZoneKey): undefined => {
    setSelectedTimeZoneKey(timeZoneKey);
    onOpen();
  };

  /**
   * 初回レンダリング時だけ、ストレージからタイムゾーンを取得することを目的としています。
   * そのためあえて、depsには空配列を指定しています。
   */
  useEffect(() => {
    const storageTimeZone = findTimeZones();
    const keyArray: TimeZoneKey[] = ["first", "second", "third"];
    keyArray.forEach(( timezoneKey ) => {
      onChangeTimeZone(storageTimeZone.get(timezoneKey)?.abb ?? "none", timezoneKey)
    });
  }, []);

  const onChangeTimeZone = (
    timeZoneAbb: string,
    updateTimeZoneKey: TimeZoneKey
  ): void => {
    onClose();
    const updateTimeZoneAbb = toTimeZoneAbb(timeZoneAbb);
    scheduleDispatch({
      type: "CHANGE_TIME_ZONE",
      updateTimeZoneKey: updateTimeZoneKey,
      updateTimeZoneAbb: updateTimeZoneAbb,
    });
    setUpdateTimeZone({
      key: updateTimeZoneKey,
      abb: updateTimeZoneAbb,
    });
  };

  const onRemoveTimeZone = (timeZoneKey: TimeZoneKey): void => {
    const noneTimeZoneAbb = toTimeZoneAbb("none");
    scheduleDispatch({
      type: "CHANGE_TIME_ZONE",
      updateTimeZoneKey: timeZoneKey,
      updateTimeZoneAbb: noneTimeZoneAbb,
    });
    setUpdateTimeZone({
      key: timeZoneKey,
      abb: noneTimeZoneAbb,
    });
  };

  const onGetTimeZoneValue = (
    timeZones: ScheduleState["timeZones"],
    timeZoneKey: TimeZoneKey
  ): TimeZoneValue => {
    const result = getTimeZoneValue(timeZones, timeZoneKey);
    if (result.abb === "none") {
      result.abb = "---";
      return result;
    }

    return result;
  };

  return (
    <>
      {toKeyArray(timeZones).map((timeZoneKey: TimeZoneKey, index: number) => (
        <Flex key={timeZoneKey} alignItems={"baseline"}>
          <VStack>
            <Button
              variant={
                onGetTimeZoneValue(timeZones, timeZoneKey).abb === "---"
                  ? "outline"
                  : undefined
              }
              colorScheme={"purple"}
              width={"6em"}
              onClick={() => onModalOpen(timeZoneKey)}
              size={"sm"}
            >
              <Icon as={GrUpdate} mr={2} />
              Edit
            </Button>
            {/** 最初の時間設定は設定された状態で固定したいので、削除ボタンを出さない。 */}
            {index > 0 && (
              <Button
                colorScheme={"purple"}
                variant={"outline"}
                width={"6em"}
                size={"sm"}
                onClick={() => onRemoveTimeZone(timeZoneKey)}
                display={"inline-flex"}
                alignItems={"center"}
              >
                <Icon mr={2} as={RxCross1} /> Delete
              </Button>
            )}
          </VStack>
          <Text w={"5em"} onClick={() => onModalOpen(timeZoneKey)}>
            <Icon as={CiTimer} mx={1} />
            {onGetTimeZoneValue(timeZones, timeZoneKey).abb}
          </Text>
        </Flex>
      ))}

      {/*
        タイムゾーンの設定コンポーネントと
        モーダルコンポーネント
      */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <SearchTimeZone
            selectedTimezone={
              onGetTimeZoneValue(timeZones, selectedTimeZoneKey).abb
            }
            handleChangeTimeZone={(value) =>
              onChangeTimeZone(value, selectedTimeZoneKey)
            }
          />
          <Button onClick={onClose}>
            <Icon as={ImCancelCircle} mr={2} />
            cancel
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};
