/**
 * @module GlobalMenu
 */

import {
  Box,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { StartDate, toDateString } from "./type-global-menu";
import { GlobalMenuAction } from "./hooks/global-menu-reducer";
import { DateString } from "@lib/type-date";

export const SelectStartDate: FC<{
  startDateList: StartDate[];
  selectedStartDate: DateString;
  handleStartDate: (action: GlobalMenuAction) => void;
}> = ({ startDateList, selectedStartDate, handleStartDate }) => {
  const onChange = (nextValue: string) => {
    handleStartDate({
      type: "SELECTED_START_DATE_ACTION",
      selectedStartDate: toDateString(nextValue),
    });
  };

  return (
    <RadioGroup value={selectedStartDate} onChange={onChange} size={"lg"}>
      <Stack direction="row" justifyContent={"space-between"}>
        {startDateList.map((startDate, index) => (
          <>
            {index === 0 && <Icon as={BiFirstPage} boxSize={6} mr={4} />}
            <Box key={startDate.sun}>
              
              <Radio value={startDate.sun} mr={2}>
                <Text color="red">{startDate.sun}（日）</Text>
              </Radio>
              <Radio value={startDate.mon}>{startDate.mon}（月）</Radio>

            </Box>
            {index === startDateList.length - 1 && (
                <Icon as={BiLastPage} boxSize={6} ml={4} />
              )}
          </>
        ))}
      </Stack>
    </RadioGroup>
  );
};
