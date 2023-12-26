import { DateString, TimeZone } from '@/library/type-date';
import { Box, Button, Flex, Icon, Modal, ModalContent, ModalOverlay, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { CiTimer } from "react-icons/ci";
import { FC, useState } from 'react';
import { CopyButton } from '../_common-button/copy-button';
import { SearchTimeZone } from '../_global-menu/search-time-zone';
import { ImCancelCircle } from "react-icons/im";
import { SelectStartDate } from '../_global-menu/select-start-date';
import { SelectWeekDays } from '../_global-menu/select-week-days';
import { createWeekRange } from '@/library/dayjs';


export const TimeZoneSetting: FC<{
  weekStartDate: DateString;
  handleChangeTimeZone: (timeZone: string) => void;
  handleChangeWeekStartDate: (weekStartDate: DateString) => void;
  timeZones: TimeZone[];
  handleModalClose: () => void;
}> = ({ weekStartDate, handleChangeTimeZone, timeZones, handleChangeWeekStartDate, handleModalClose }) => {
  /**
   * タイムゾーン設定ボタンをクリック時の処理
   * クリックしたときに、何番目のボタンをクリックしたかを保持する
   */
    const [clickedTimezoneIndex, setClickedTimezoneIndex] = useState(0);

    const [weekRange, setWeekRange] = useState(createWeekRange(weekStartDate));

  /**
   * 日付の選択を変更した時の処理
   */
  const handleSelectDate = (selectDate: DateString) => {
    handleChangeWeekStartDate(selectDate);
    setWeekRange(createWeekRange(selectDate));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onModalOpen = (index: number): undefined => {
    setClickedTimezoneIndex(index);
    onOpen();
  };

  return (
    <>
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
            入力キャンセル
          </Button>
        </ModalContent>
      </Modal>
      <Box mt={1}>
        <SelectStartDate
          selectedStartDate={weekStartDate}
          handleStartDate={handleSelectDate}
        />
      </Box>
      <SimpleGrid minChildWidth="1rem" spacing="40px" p={2} mt={1}>
        <SelectWeekDays selectedDate={weekStartDate} weekRange={weekRange} />
      </SimpleGrid>
      </>
  
)
}