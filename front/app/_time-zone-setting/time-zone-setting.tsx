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

export const TimeZoneSetting: FC<{
  handleChangeTimeZone: (changeTimezoneIndex: number, timeZone: string) => void;
  timeZones: TimeZone[];
}> = ({ handleChangeTimeZone, timeZones }) => {
  /**
   * 何番目のタイムゾーンを変更するかを特定するために、
   * クリックされたタイムゾーンの位置を保持する
   */
  const [selectedTimeZoneIndex, setSelectedTimeZoneIndex] = useState<number>(0);

  /**
   * タイムゾーン設定モーダルの開閉を管理
   */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onModalOpen = (targetIndex: number): undefined => {
    setSelectedTimeZoneIndex(targetIndex);
    onOpen();
  };

  const onClickedTimeZone = (timeZone: string): void => {
    handleChangeTimeZone(selectedTimeZoneIndex, timeZone);
    onClose();
  };

  return (
    <Flex
      px={4}
      roundedTopLeft={12}
      roundedTopRight={12}
      alignItems={"baseline"}
    >
      {timeZones.map((timeZone: TimeZone, index: number) => (
        <Flex key={timeZone} w={"30%"} alignItems={"baseline"} mt={6}>
          <Text pr={2}>
            <Icon as={CiTimer}></Icon> {timeZone}
          </Text>
          <Button mb={4} onClick={() => onModalOpen(index)}>
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
            selectedTimezone={timeZones[selectedTimeZoneIndex]}
            handleChangeTimeZone={onClickedTimeZone}
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
