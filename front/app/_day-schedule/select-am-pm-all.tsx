import { FC } from "react";
import {TimeType} from "./type-day-schedule";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export const SelectAmPmAll: FC<{
  timeTypeOptions: TimeType[],
  selectedTimeType: TimeType,
}> = ({ 
  timeTypeOptions,
  selectedTimeType
 }) => {
  return (
  <>
<RadioGroup defaultValue={selectedTimeType}>
  <Stack spacing={4} direction='row'>
    {timeTypeOptions.map((timeOption) => (
    <Radio key={timeOption} value={timeOption}>
    {timeOption}
  </Radio>  
    ))}
  </Stack>
</RadioGroup>
  </>);
};

