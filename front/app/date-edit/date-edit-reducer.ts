import dayjs from "dayjs";
import {
  WeekStartDayString,
  CalendarDate,
  WEEK_START_DAY,
} from "./types-date-edit";
import {
  adjustNextStartDay,
  toAddYoubiFormat,
  validMinDate,
} from "./date-edit-function";

export type State = {
  inputDate: string; // 入力値をそのまま反映するため、string型で保持する
  calendarDate: Date; // 日付形式の入力値の場合だけ、Date型に変換して保持したいので、inputDateとは別に保持する
  weekStartDay: WeekStartDayString;
};

/**
 * ここの型定義がreducerの引数の型定義になる
 */
export type DateEditAction =
  | { type: "SET_SELECTED_DATE"; date: CalendarDate }
  | { type: "SET_INPUT_DATE"; inputDate: string }
  | { type: "SET_WEEK_START_DAY"; weekStartDay: WeekStartDayString | string };

export const dateEditReducer = (
  state: State,
  action: DateEditAction
): State => {
  switch (action.type) {
    /**
     * 選択された日付を元に、入力日とカレンダーの日付を補正する
     */
    case "SET_SELECTED_DATE":
      return {
        ...state,
        calendarDate: adjustNextStartDay(action.date, state.weekStartDay),
        inputDate: toAddYoubiFormat(action.date, state.weekStartDay),
      };
    /**
     * 入力途中の日付は無効な日付形式になっていることがあるので、
     * その場合は入力データをそのまま返却しています
     */
    case "SET_INPUT_DATE":
      const inputDateString = action.inputDate;
      const isValidDate = !isNaN(Date.parse(inputDateString));
      const oneWeekAgo = validMinDate(new Date());
      if (isValidDate && oneWeekAgo < dayjs(inputDateString)) {
        const inputDate = new Date(inputDateString);

        return {
          ...state,
          inputDate: inputDateString,
          calendarDate: adjustNextStartDay(inputDate, state.weekStartDay),
        };
      } else {
        return {
          ...state,
          inputDate: action.inputDate,
          calendarDate: state.calendarDate,
        };
      }
    /**
     * 開始日の変更
     * 開始曜日を変更された場合は、現在日ベースで計算しなおす。
     * 入力日やカレンダーで選択された日付は無視する
     */
    case "SET_WEEK_START_DAY":
      const weekStartDay = action.weekStartDay;
      const exists = WEEK_START_DAY.find((day) => day === weekStartDay);
      if (!exists) {
        throw new Error(`Unexpected weekStartDay: ${weekStartDay}`);
      }

      const currentDate = new Date();
      return {
        ...state,
        weekStartDay: weekStartDay,
        inputDate: toAddYoubiFormat(currentDate, weekStartDay),
        calendarDate: adjustNextStartDay(currentDate, weekStartDay),
      };

    default:
      return state;
  }
};
