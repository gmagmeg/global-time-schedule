import { DateString } from "@/library/type-date";

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
