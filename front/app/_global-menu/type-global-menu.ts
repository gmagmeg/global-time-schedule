/**
 * @module _global-menu
 */

import { DateString } from "@lib/type-date";

export const toDateString = (from: string): DateString => {
  return from;
};

export type StartDate = {
  sun: DateString;
  mon: DateString;
};

// @todo startDateListはコンポーネントにいてよさそう
export type GlobalMenuState = {
  selectedStartDate: DateString;
  startDateList: StartDate[];
};
