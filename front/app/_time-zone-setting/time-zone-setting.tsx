/**
 * @module time-zone-setting
 */
import { TimeZone } from "@/library/type-date";
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
import { FC, useState } from "react";
import { CopyButton } from "../_common-button/copy-button";
import { SearchTimeZone } from "./search-time-zone";
import { ImCancelCircle } from "react-icons/im";
import { ScheduleAction, TimeZoneAbb, TimeZoneKey, TimeZoneValue, TimeZones } from "../schedule/hooks/schedule-reducer";
import { toTimeZone } from "@/hooks/time-zone-reducer";
import { toKeyArray } from "@/library/common";

export const TimeZoneSetting: FC<{
  timeZones: TimeZones;
  scheduleDispatch: (action: ScheduleAction) => void;
}> = ({ timeZones, scheduleDispatch }) => {
  /**
   * 何番目のタイムゾーンを変更するかを特定するために、
   * クリックされたタイムゾーンの位置を保持する
   */
  const [selectedTimeZoneKey, setSelectedTimeZoneKey] = useState<TimeZoneKey>("first");

  /**
   * タイムゾーン設定モーダルの開閉を管理
   */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onModalOpen = (timeZoneKey: TimeZoneKey): undefined => {
    setSelectedTimeZoneKey(timeZoneKey);
    onOpen();
  };

  /**
   * タイムゾーンの変更
   */
  const onChangeTimeZone = (
    timeZoneAbb: string
  ): void => {
    scheduleDispatch({
      type: "CHANGE_TIME_ZONE",
      updateTimeZoneAbb: timeZoneAbb as TimeZoneAbb,
      updateTimeZoneKey: selectedTimeZoneKey,
    });
  };

  const getTimeZoneValue = (timeZoneKey: TimeZoneKey): TimeZoneValue => {
    const result = timeZones.get(timeZoneKey);
    if (!result) {
      throw new Error("タイムゾーンが見つかりません");
    }
    
    return result;
  }

  return (
    <Flex
      px={4}
      roundedTopLeft={12}
      roundedTopRight={12}
      alignItems={"baseline"}
    >
      {toKeyArray(timeZones).map((timeZoneKey: TimeZoneKey) => (
        <Flex key={timeZoneKey} w={"30%"} alignItems={"baseline"} mt={6}>
          <Text pr={2}>
            <Icon as={CiTimer}></Icon> {getTimeZoneValue(timeZoneKey).abb}
          </Text>
          <Button mb={4} onClick={() => onModalOpen(timeZoneKey)}>
            変更する
          </Button>
        </Flex>
      ))}
      <CopyButton copyText="全件コピー" width="10%" />
      {/*
        タイムゾーンの設定コンポーネントと
        モーダルコンポーネント
      */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <SearchTimeZone
            selectedTimezone={getTimeZoneValue(selectedTimeZoneKey).abb}
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
