import { RadioGroupChangeEvent } from "@/app/event-types-alias";

export type HourOptionProps = {
  checked: HourOptionString;
  onChange: RadioGroupChangeEvent;
};

export const HOUR_OPTION = { half: "12", full: "24" } as const;
export type HourOptionString = "12" | "24" | string;
