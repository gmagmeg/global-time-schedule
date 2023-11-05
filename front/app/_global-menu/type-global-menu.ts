// ex: 2023-01-01
export type DateString = string;

export const toDateString = (from: string): DateString => {
  return from;
};

export type StartDate = {
  sun: DateString;
  mon: DateString;
};

export type GlobalMenuState = {
  selectedStartDate: DateString;
  startDateList: StartDate[];
};
