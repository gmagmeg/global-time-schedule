export type HourOptionProps = {
  checked: HourOptionNumber;
  onClick: (value: HourOptionNumber) => void;
};

export const HOUR_OPTION = { half: 12, full: 24 } as const;
export type HourOptionNumber = 12 | 24;
