/**
 * @module _day-schedule
 */

import { TimeZone } from "@lib/type-date";
import { hour12, hour24 } from "../_day-schedule-function";
import { DayScheduleState } from "../hooks/day-schedule-state";
import { HourOrMinutes, TimeType, toHourOrMinutes } from "../type-day-schedule";
import { customDayjs } from "@lib/dayjs";
import dayjs from "dayjs";

/**
 * DayScheduleAction タイプは、日スケジュールに関するアクションの種類を定義します。
 * 以下の3つのアクションタイプがあります:
 * 1. CHANGE_HOUR_SELECT_BOX: 時間の選択を変更するアクション
 *    - hour: HourOrMinutes - 選択された時間
 * 2. CHANGE_MINUTES_SELECT_BOX: 分の選択を変更するアクション
 *    - minutes: HourOrMinutes - 選択された分
 * 3. CHANGE_AM_PM_ALL: 午前/午後の選択を変更するアクション
 *    - timeType: TimeType - 選択された午前/午後
 */
export type DayScheduleAction =
  | {
      type: "CHANGE_HOUR_SELECT_BOX";
      hour: HourOrMinutes;
    }
  | {
      type: "CHANGE_MINUTES_SELECT_BOX";
      minutes: HourOrMinutes;
    }
  | {
      type: "CHANGE_AM_PM_ALL";
      timeType: TimeType;
    };

export const DayScheduleReducer = (
  state: DayScheduleState,
  action: DayScheduleAction
): DayScheduleState => {
  let convertTime = "";

  switch (action.type) {
    /**
     * 時間の選択肢を変更する
     * - 表示時間の表記を修正する
     */
    case "CHANGE_HOUR_SELECT_BOX":
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          hour: action.hour,
        },
        /** @todo 実際にエラーが起きてるのこっちかも。
         * 要調査 */
        displayTimes: [
          toTimeZoneTime(state, state.timeZone.from, state.timeZone.to[0]),
        ],
      };
    /*
     * 分の選択肢を変更する
     * - 表示時間の表記を修正する
     */
    case "CHANGE_MINUTES_SELECT_BOX":
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          minute: action.minutes,
        },
        displayTimes: [
          toTimeZoneTime(state, state.timeZone.from, state.timeZone.to[0]),
        ],
      };
    /**
     * AM/PM/24hの切り替えに合わせて、次のことを行う
     * - 時間の選択肢を変更する
     * - 24時間表示 → 12時間表示の場合、時間の表記を補正する
     */
    case "CHANGE_AM_PM_ALL":
      let selectedHour = state.selectedTime.hour;
      let hourOptions = hour24;
      if (action.timeType === "24h") {
        console.log("24");
        hourOptions = hour24;
      } else {
        hourOptions = hour12;
        if (selectedHour > 12) {
          console.log("AM/PM");
          selectedHour = toHourOrMinutes(state.selectedTime.hour - 12);
        }
      }

      return {
        ...state,
        // selectedTime: {
        //   ...state.selectedTime,
        //   hour: selectedHour,
        //   type: action.timeType,
        // },
        timeSelectOption: {
          ...state.timeSelectOption,
          hour: hourOptions,
        },
        // displayTimes: [
        //   toTimeZoneTime(state, state.timeZone.from, state.timeZone.to[0]),
        // ],
      };

    default:
      return state;
  }
};

/**
 *
 * @param state
 * @param fromTimeZone
 * @param toTimeZoneTime
 * @returns
 */
export const toTimeZoneTime = (
  state: DayScheduleState,
  fromTimeZone: TimeZone,
  toTimeZoneTime: TimeZone
): string => {
  const { startDate, selectedTime } = state;

  const YMD = customDayjs(startDate).format("YYYY-MM-DD");
  const baseTime = `${YMD} ${selectedTime.hour}:${selectedTime.minute} ${selectedTime.type}`;

  const timeInBaseTimezone = dayjs.tz(`${baseTime}`, fromTimeZone);

  return timeInBaseTimezone.tz(toTimeZoneTime).format("HH:mm A");
};
