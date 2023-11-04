// ex: 2023-01-01
export type DateString = string;

export type StartDate = {
  sun: DateString;
  mon: DateString;
};

export type GlobalMenuState = {
  selectedDate: DateString;
  startDateList: StartDate[];
};
