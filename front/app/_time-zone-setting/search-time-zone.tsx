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
import {
  filterTimeZones,
  mappingTimezone as initTimezones,
} from "@lib/mapping-timezone";
import { RiFilterLine } from "react-icons/ri";

import { useState } from "react";
import { TimeZone } from "@/library/type-date";
import { TimeZoneAbb } from "../schedule/hooks/schedule-reducer";

export const SearchTimeZone = ({
  selectedTimezone,
  handleChangeTimeZone,
}: {
  selectedTimezone: TimeZone;
  handleChangeTimeZone: (timeZoneAbb: string) => void;
}) => {
  /**
   * タイムゾーンの絞り込みを行う処理
   */
  const [timeZoneOptions, setTimeZoneOptions] = useState(initTimezones);
  const onTimeZones = (timeZoneAbbString: string): void => {
    const timeZoneAbb = timeZoneAbbString as TimeZoneAbb;
    if (timeZoneAbb === "") {
      setTimeZoneOptions(initTimezones);
    } else {
      setTimeZoneOptions(filterTimeZones(timeZoneAbb));
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
      {timeZoneOptions[0].abb === "" && (
        <p>タイムゾーンが見つかりませんでした</p>
      )}
      {timeZoneOptions[0].abb !== "" && (
        <List overflowY={"auto"} style={{ height: "60vh" }}>
          <RadioGroup
            value={selectedTimezone}
            ml={2}
            onChange={(abb) => handleChangeTimeZone(abb)}
          >
            {timeZoneOptions.map(({ abb, full }) => (
              <ListItem mb={2} key={abb} value={abb}>
                <Radio value={abb}>
                  {abb}
                  <br />
                  {full}
                </Radio>
              </ListItem>
            ))}
          </RadioGroup>
        </List>
      )}
    </Box>
  );
};
