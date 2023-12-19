/**
 * @module _day-schedule
 */

import { DayScheduleState, hour12, hour24 } from "../hooks/day-schedule-state";
import { HourOrMinutes, TimeType, toHourOrMinutes } from "../type-day-schedule";
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
        hourOptions = hour24;
      } else {
        hourOptions = hour12;
        if (selectedHour > 12) {
          selectedHour = toHourOrMinutes(state.selectedTime.hour - 12);
        }
      }

      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          hour: selectedHour,
          type: action.timeType,
        },
        timeSelectOption: {
          ...state.timeSelectOption,
          hour: hourOptions,
        },
        displayTimes: [
          toTimeZoneTime(state, state.timeZone.from, state.timeZone.to[0]),
        ],
      };

    default:
      return state;
  }
};

/**
 * 基準日をタイムゾーンに応じた時間に変換する
 */
export const toTimeZoneTime = (
  baseDate: DayScheduleState["startDate"],
  timezone: DayScheduleState["timeZone"]
): string => {
  // UTC文字列から数値を取得する
  const convertUTCNum = (utcString: string): number => {
    const utcNum = Number(utcString.replace("UTC", "").replace(/:\d{2}/, ""));
    return utcNum;
  };

  const fromUTCNum = convertUTCNum(timezone.from.utc);
  const toUTCNum = convertUTCNum(timezone.to[timezone.toIndex].utc);
  const currentHour = dayjs(baseDate).hour();
  const correctHour = currentHour + (fromUTCNum - toUTCNum);

  return correctHour <= 0
    ? dayjs(baseDate).add(correctHour, "hour").format("hh:mm A")
    : dayjs(baseDate).subtract(correctHour, "hour").format("hh:mm A");
};
