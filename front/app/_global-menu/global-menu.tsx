/**
 * @module _global-menu
 */

import { FC, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
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
import { DateString } from "@/library/type-date";
import { createWeekRange } from "@/library/dayjs";

export const GlobalMenu: FC = () => {
  const [selectDate, setSelectDate] = useState("2023-11-26");
  const [weekRange, setWeekRange] = useState(createWeekRange("2023-11-26"));
  const handleSelectDate = (selectDate: DateString) => {
    setSelectDate(selectDate);
    setWeekRange(createWeekRange(selectDate));
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex bgColor={"#B4C6EA"} px={4} roundedTopLeft={12} roundedTopRight={12}>
        <Box w={"30%"}>
          <Text>
            <Icon as={CiTimer}></Icon> JST
          </Text>
          <Button mb={4} onClick={onOpen}>
            変更する
          </Button>
        </Box>
        <Box w={"30%"}>
          <Text>
            <Icon as={CiTimer}></Icon>JST
          </Text>
          <Button mb={4} onClick={onOpen}>
            <Text>変更する</Text>
          </Button>
        </Box>
        <Box w={"30%"}>
          <Text>
            <Icon as={CiTimer}></Icon>---
          </Text>
          <Button mb={4} onClick={onOpen}>
            <Text>タイムゾーンを設定する</Text>
          </Button>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <SearchTimeZone />
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
        <CopyButton copyText="全件コピー" />
      </SimpleGrid>
    </>
  );
};
