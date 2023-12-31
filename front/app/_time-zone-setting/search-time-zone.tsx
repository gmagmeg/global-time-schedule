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
import { filterTimeZones, mappingTimezone as initTimezones } from "@lib/mapping-timezone";
import { RiFilterLine } from "react-icons/ri";

import { FC, useState } from "react";
import { TimeZone } from "@/library/type-date";
import { TimeZoneAbb } from "../schedule/hooks/schedule-reducer";

export const SearchTimeZone: FC<{
  selectedTimezone: TimeZone;
  handleChangeTimeZone: (timeZoneAbb: string) => void;
}> = ({ selectedTimezone, handleChangeTimeZone }) => {
  /**
   * タイムゾーンの絞り込みを行う処理
   */
  const [timeZoneValues, setTimeZoneValues] = useState(initTimezones);
  const onTimeZones = (timeZoneAbbString: string): void => {
    const timeZoneAbb = timeZoneAbbString as TimeZoneAbb;
    if (timeZoneAbb === "") {
      setTimeZoneValues(initTimezones);
    } else {
      setTimeZoneValues(filterTimeZones(timeZoneAbb));
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
          onChange={(abb) => handleChangeTimeZone(abb)}
        >
          {timeZoneValues.map(({ abb, full }) => (
            <ListItem mb={2} key={abb} value={abb}>
              <Radio value={abb}>{full}</Radio>
            </ListItem>
          ))}
        </RadioGroup>
      </List>
    </Box>
  );
};
