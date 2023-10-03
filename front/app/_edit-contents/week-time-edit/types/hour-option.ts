export type HourOptionProps = {
  checked: HourOption;
  onChange: (value: HourOption) => void;
};

export const HOUR_OPTION = { half: "12", full: "24" } as const;
export type HourOption = "12" | "24";
