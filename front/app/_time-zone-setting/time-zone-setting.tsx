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
} from "../schedule/hooks/schedule-reducer";
import { toKeyArray } from "@/library/common";
import { getTimeZoneValue } from "../schedule/hooks/schedule-reducer-function";
import { saveTimeZones } from "../schedule/schedule-repository";

export const TimeZoneSetting = ({
  timeZones,
  scheduleDispatch,
}: {
  timeZones: TimeZones;
  scheduleDispatch: (action: ScheduleAction) => void;
}) => {
  /**
   * 何番目のタイムゾーンを変更するかを特定するために、
   * クリックされたタイムゾーンの位置を保持する
   */
  const [selectedTimeZoneKey, setSelectedTimeZoneKey] =
    useState<TimeZoneKey>("first");

  /**
   * タイムゾーン設定モーダルの開閉を管理
   */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onModalOpen = (timeZoneKey: TimeZoneKey): undefined => {
    setSelectedTimeZoneKey(timeZoneKey);
    onOpen();
  };

  /**
   * タイムゾーンへの変更処理
   * 値の変更だけなので、同じdispatchを利用する。
   * タイムゾーンの変更は記録して、ユーザーが次回アクセスしたときに出来るようにしておく。
   * - 登録
   * - 解除
   */
  useEffect(() => {
    saveTimeZones(timeZones);
  }, [timeZones]);

  const onChangeTimeZone = (timeZoneAbb: string): void => {
    onClose();
    scheduleDispatch({
      type: "CHANGE_TIME_ZONE",
      updateTimeZoneAbb: timeZoneAbb as TimeZoneAbb,
      updateTimeZoneKey: selectedTimeZoneKey,
    });
  };

  const onRemoveTimeZone = (timeZoneKey: TimeZoneKey): void => {
    scheduleDispatch({
      type: "CHANGE_TIME_ZONE",
      updateTimeZoneAbb: "none" as TimeZoneAbb,
      updateTimeZoneKey: timeZoneKey,
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
            handleChangeTimeZone={onChangeTimeZone}
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
