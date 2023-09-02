import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FC } from "react";
import { Youbi } from "./types-time-edit";

export const TimeEdit: FC<{
  youbi: Youbi;
  marginRight?: number;
}> = ({ youbi = "日" }, marginRight = 0) => {
  return (
    <FormControl mr={marginRight}>
      <FormLabel>{youbi}曜日</FormLabel>
      <Input htmlSize={4} width="auto" type="time" />
    </FormControl>
  );
};
