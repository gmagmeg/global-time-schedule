import { Box, Icon, Radio, RadioGroup, Spacer, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { StartDate, DateString } from "./type-global-menu";

export const SelectStartDate: FC<{ startDateList: StartDate[], selectStartDate: DateString }> = ({
  startDateList,
  selectStartDate
}) => {
  return (
    <RadioGroup value={selectStartDate}>
      <Stack direction="row">
        <Icon as={BiFirstPage} boxSize={6} />
        <Spacer />
        {startDateList.map((startDate) => (
          <>
          <Box key={startDate.sun}>
            <Radio value={startDate.sun} mr={2}>
              <Text color="red">{startDate.sun}（日）</Text>
            </Radio>
            <Radio value={startDate.mon}>{startDate.mon}（月）</Radio>
            <Spacer />
          </Box>
          <Spacer />
          </>
        ))}
        <Icon as={BiLastPage} boxSize={6} />
      </Stack>
    </RadioGroup>
  );
};
