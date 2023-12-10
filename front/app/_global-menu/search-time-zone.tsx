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
import { timezones as initTimezones } from "@lib/timezone_mapping.js";
import { RiFilterLine } from "react-icons/ri";

import { FC, useState } from "react";

export const SearchTimeZone: FC = () => {
  const [timeZones, setTimeZones] = useState(initTimezones);
  const onTimeZones = (filterString: string): void => {
    if (filterString === "") {
      setTimeZones(initTimezones);
    } else {
      const filteredResult = initTimezones.filter((item) =>
        item.full.includes(filterString)
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
      <List overflowY={"auto"} style={{ height: "70vh" }}>
        <RadioGroup value="JST" ml={2}>
          {timeZones.map(({ add, full }) => (
            <ListItem mb={2} key={add} value={add}>
              <Radio value={add}>{full}</Radio>
            </ListItem>
          ))}
        </RadioGroup>
      </List>
    </Box>
  );
};
