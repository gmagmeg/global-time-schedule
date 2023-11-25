import {
  DayScheduleState,
  HourOrMinutes,
  TimeType,
  toHourOrMinutes,
} from "../type-day-schedule";
import { hour12, hour24 } from "./day-schedule-state";

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

/**
 * @todo 各Caseで、右端の時間フォーマットを変更する処理を定義する
 * @todo コンフルのAPIもChatGPTで調べる
 */
export const DayScheduleReducer = (
  state: DayScheduleState,
  action: DayScheduleAction
): DayScheduleState => {
  switch (action.type) {
    /**
     * 時間の選択肢を変更する
     */
    case "CHANGE_HOUR_SELECT_BOX":
      // dayjsにhourとminuteを渡して、HH:mmの形式で文字列を作成する
      // この時にtimezoneも渡す
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          hour: action.hour,
        },
      };
    /*
     * 分の選択肢を変更する
     */
    case "CHANGE_MINUTES_SELECT_BOX":
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          minute: action.minutes,
        },
      };
    /**
     * AM/PM/24hの切り替えに合わせて、時間の選択肢も変更する
     */
    case "CHANGE_AM_PM_ALL":
      let hourOptions = hour12;
      let selectedHour = state.selectedTime.hour;
      if (action.timeType === "24h") {
        hourOptions = hour24;
      } else {
        /**
         * 12時間表示の場合、時間の表記を補正する
         */
        if (selectedHour > 12) {
          selectedHour = toHourOrMinutes(state.selectedTime.hour - 12);
        }
      }

      return {
        ...state,
        timesOptions: {
          ...state.timesOptions,
          hourOptions,
        },
        selectedTime: {
          ...state.selectedTime,
          hour: selectedHour,
          timeType: action.timeType,
        },
      };
    default:
      return state;
  }
};
