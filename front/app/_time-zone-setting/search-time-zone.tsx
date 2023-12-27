/**
 * @module time-zone-setting
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
  handleChangeTimeZone: (timeZone: string) => void;
}> = ({ selectedTimezone, handleChangeTimeZone }) => {
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
          onChange={(value) => handleChangeTimeZone(value)}
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
