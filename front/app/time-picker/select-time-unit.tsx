import { FC } from "react";
import {
  SelectChangeEventHandler,
  MinutesUnit,
} from "@app/time-picker/types-time-picker";

// 分の単位を選択するセレクトボックス
export const SelectTimeUnit: FC<{
  onChangeHandler: SelectChangeEventHandler;
  minutesUnitList: MinutesUnit[];
}> = ({ onChangeHandler, minutesUnitList }) => {
  return (
    <>
      <label htmlFor="minutesUnit">分の単位</label>
      <select name="minutesUnit" id="minutesUnit" onChange={onChangeHandler}>
        {minutesUnitList.map((minutesUnit) => {
          return (
            <option key={minutesUnit} value={minutesUnit}>
              {minutesUnit}分
            </option>
          );
        })}
      </select>
    </>
  );
};
