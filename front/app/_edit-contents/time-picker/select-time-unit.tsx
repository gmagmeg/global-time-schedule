import { FC } from "react";
import { SelectChangeEventHandler } from "@editContents/time-picker/types-time-picker";
import { MinutesUnion } from "@editContents/week-time-edit/types/time-select-box";

// 分の単位を選択するセレクトボックス
export const SelectTimeUnit: FC<{
  onChangeHandler: SelectChangeEventHandler;
  minutesList: MinutesUnion[];
}> = ({ onChangeHandler, minutesList }) => {
  return (
    <>
      <label htmlFor="minutesUnit">分の単位</label>
      <select name="minutesUnit" id="minutesUnit" onChange={onChangeHandler}>
        {minutesList.map((minutes) => {
          return (
            <option key={minutes} value={minutes}>
              {minutes}分
            </option>
          );
        })}
      </select>
    </>
  );
};
