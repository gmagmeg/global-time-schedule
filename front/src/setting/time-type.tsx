/**
 * @module src/setting
 */

import { useEffect } from "react";
import {
  ScheduleAction,
  ScheduleState,
  TimeTypePattern,
} from "../hooks/schedule-reducer";
import { Button, Stack } from "@chakra-ui/react";
import { findTimeTypePattern } from "../schedule-repository";

export const TimeType = ({
  timeTypePattern,
  setUpdatedTimeTypePattern,
  scheduleDispatch,
}: {
  timeTypePattern: TimeTypePattern;
  setUpdatedTimeTypePattern: (timeTypePattern: TimeTypePattern) => void;
  scheduleDispatch: (action: ScheduleAction) => void;
}) => {
  const onChangeSelectTimeType = (nextValue: string): void => {
    scheduleDispatch({
      type: "DECIDE_TIME_TYPE_PATTERN",
      timeTypePattern: nextValue as ScheduleState["timeTypePattern"],
    });
    setUpdatedTimeTypePattern(nextValue as TimeTypePattern);
  };

  useEffect(() => {
    onChangeSelectTimeType(findTimeTypePattern());
  }, []);

  return (
    <Stack direction="column" align="start">
      <Button
        size={"sm"}
        w={"8em"}
        colorScheme={"purple"}
        variant={timeTypePattern === "AM/PM" ? undefined : "outline"}
        onClick={() => onChangeSelectTimeType("AM/PM")}
      >
        AM/PM
      </Button>
      <Button
        w={"8em"}
        size={"sm"}
        colorScheme={"purple"}
        variant={timeTypePattern === "24h" ? undefined : "outline"}
        onClick={() => onChangeSelectTimeType("24h")}
      >
        24h
      </Button>
    </Stack>
  );
};
