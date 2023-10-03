import { FC } from "react";
import { BiTime } from "react-icons/bi";

export const TimeDataList: FC<{ dataTimeList: string[] }> = ({
  dataTimeList,
}) => {
  return (
    <>
      <div className="input-container">
        <input className="input-time" list="minutesList" type="text" />
        <BiTime className="input-icon" />
      </div>
      <datalist id="minutesList">
        {dataTimeList.map((timeData) => {
          return <option key={timeData} value={timeData} />;
        })}
      </datalist>
    </>
  );
};
