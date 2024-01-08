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
  useDisclosure,
} from "@chakra-ui/react";
import { CiTimer } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
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
   * 値の変更だけなので、同じdispatchを利用する
   * - 登録
   * - 解除
   */
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
    <Flex
      px={4}
      roundedTopLeft={12}
      roundedTopRight={12}
      alignItems={"baseline"}
    >
      {toKeyArray(timeZones).map((timeZoneKey: TimeZoneKey, index: number) => (
        <Flex key={timeZoneKey} w={"30%"} alignItems={"baseline"} mt={6}>
          <Text pr={2}>
            <Icon as={CiTimer} />
            {onGetTimeZoneValue(timeZones, timeZoneKey).abb}
          </Text>
          <Button mr={4} onClick={() => onModalOpen(timeZoneKey)}>
            <Icon as={GrUpdate} mr={3} />
            変更する
          </Button>
          {/** 最初の時間設定は設定された状態で固定したいので、削除ボタンを出さない。 */}
          {index > 0 && (
            <Button
              onClick={() => onRemoveTimeZone(timeZoneKey)}
              display={"inline-flex"}
              alignItems={"center"}
            >
              <Icon as={RxCross1} mr={1} /> 削除する
            </Button>
          )}
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
            入力キャンセル
          </Button>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
