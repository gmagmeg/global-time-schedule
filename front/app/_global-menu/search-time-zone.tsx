/**
 * @module _global-menu
 */

import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { timezones as initTimezones } from "@lib/timezone_mapping";
import { RiFilterLine } from "react-icons/ri";

import { FC, useState } from "react";
import { TimeZone } from "@/library/type-date";

export const SearchTimeZone: FC<{
  selectedTimezone: TimeZone;
  timezoneIndex: number;
  handleChangeTimeZone: (timeZone: string) => void;
  handleModalClose: () => void;
}> = ({ selectedTimezone, timezoneIndex, handleChangeTimeZone, handleModalClose }) => {
  /**
   * タイムゾーンの絞り込みを行う処理
   */
  const [timeZones, setTimeZones] = useState(initTimezones);
  const onTimeZones = (inputTimeZone: string): void => {
    // 選択肢の初期化
    if (inputTimeZone === "") {
      setTimeZones(initTimezones);
    } else {
      const filteredResult = initTimezones.filter((item) =>
        item.full.includes(inputTimeZone)
      );
      setTimeZones(filteredResult);
    }
  };

  /**
   * タイムゾーンが選択された時の処理
   * モーダルで開かれている都合上、indexの指定が難しいため、ここでは0で固定する。
   * 親コンポーネント側で再度指定する
   */
  const onClickedTimeZone = (timeZone: string): void => {
    handleChangeTimeZone(timeZone);
    handleModalClose();
  };

  return (
    <Box p={8}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={RiFilterLine} color="gray.900" />
        </InputLeftElement>
        <Input
          id="time-zone"
          mb={2}
          placeholder="絞り込む"
          onChange={(e) => onTimeZones(e.target.value)}
        />
      </InputGroup>
      <List overflowY={"auto"} style={{ height: "60vh" }}>
        <RadioGroup
          value={selectedTimezone}
          ml={2}
          onChange={(value) => onClickedTimeZone(value)}
        >
          {timeZones.map(({ abb, full }) => (
            <ListItem mb={2} key={abb} value={abb}>
              <Radio value={abb}>{full}</Radio>
            </ListItem>
          ))}
        </RadioGroup>
      </List>
    </Box>
  );
};
