/**
 * @module _global-menu
 */

import { FC, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchTimeZone } from "./search-time-zone";
import { CiTimer } from "react-icons/ci";

import { SelectStartDate } from "./select-start-date";
import { SelectWeekDays } from "./select-week-days";
import { CopyButton } from "../_common-button/copy-button";
import { DateString, TimeZone } from "@/library/type-date";
import { createWeekRange } from "@/library/dayjs";
import { ImCancelCircle } from "react-icons/im";
import Image from "next/image";
import Head from "next/head";


export const GlobalMenu: FC<{
  timeZones: TimeZone[];
  handleChangeTimeZone: (timeZone: string) => void;
  handleModalClose: () => void;
}> = ({ timeZones, handleChangeTimeZone }) => {
  const [selectDate, setSelectDate] = useState("2023-11-26");
  const [weekRange, setWeekRange] = useState(createWeekRange("2023-11-26"));

  /**
   * 日付の選択を変更した時の処理
   */
  const handleSelectDate = (selectDate: DateString) => {
    setSelectDate(selectDate);
    setWeekRange(createWeekRange(selectDate));
  };

  /**
   * タイムゾーン設定ボタンをクリック時の処理
   * クリックしたときに、何番目のボタンをクリックしたかを保持する
   */
  const [clickedTimezoneIndex, setClickedTimezoneIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onModalOpen = (index: number): undefined => {
    setClickedTimezoneIndex(index);
    onOpen();
  };

  return (
    <Box bgColor={"#B4C6EA"} >
      <Heading as={"h1"} >ここにロゴを入れる</Heading>
      {/* <Image src="/sitelogo.png" width={500} height={100} alt={"VTubeWorld Scheduler"} /> */}
      {/* タイムゾーンの設定ボタン */}
      <Flex px={4} roundedTopLeft={12} roundedTopRight={12} alignItems={"baseline"}>

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
      </Flex>

      {/*
        タイムゾーンの設定コンポーネントと
        モーダルコンポーネント
      */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <SearchTimeZone
            selectedTimezone={timeZones[0]}
            timezoneIndex={clickedTimezoneIndex}
            handleChangeTimeZone={handleChangeTimeZone}
            handleModalClose={onClose}
          />
          <Button onClick={onClose}>
            <Icon as={ImCancelCircle} mr={2} />
            入力キャンセル</Button>
        </ModalContent>
      </Modal>
      <Box mt={1}>
        <SelectStartDate
          selectedStartDate={selectDate}
          handleStartDate={handleSelectDate}
        />
      </Box>
      <SimpleGrid minChildWidth="1rem" spacing="40px" p={2} mt={1}>
        <SelectWeekDays selectedDate={selectDate} weekRange={weekRange} />
        
      </SimpleGrid>
      </Box>
  );
};
