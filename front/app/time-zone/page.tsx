"use client";

import { useState } from "react";
import { timezone as timezoneNoneType } from "./timezone-groupAbb";
import { InputChangeEvent } from "@app/common-type";

type TimezoneType = {
  [key: string]: {
    utc_offset: string;
    timezone: string[];
  };
};

export default function TimeZone() {
  const [selectedTimezone, setSelectedTimezone] = useState("" as string);

  const timezone: TimezoneType = timezoneNoneType;
  const abbList = Object.keys(timezone);

  // タイムゾーンを変更した時の処理
  const handleChangeTimezone = ({ target }: InputChangeEvent) => {
    setSelectedTimezone(target.value);
  };

  const handleChangeContryName = ({ target }: InputChangeEvent) => {

    target.value;
  };

  // タイムゾーンの略称名で表示する
  const displayName = (abbTimezone: string): string => {
    return timezone[abbTimezone].utc_offset;
  };

  // 国名を表示する
  const displayContoryName = (contoryNameList: string[]): JSX.Element[] => {
    return contoryNameList.map((contoryName) => {
      return (
        <option key={contoryName} value={contoryName}>
          {contoryName}
        </option>
      );
    });
  };

  return (
    <>
      <input
        type="text"
        list="timezone-list"
        id="timezone"
        onChange={handleChangeTimezone}
      />
      <datalist id="timezone-list">
        {abbList.map((abbTimezone) => {
          return (
            <option key={abbTimezone} value={abbTimezone}>
              {displayName(abbTimezone)}
            </option>
          );
        })}
      </datalist>

      <input
        type="text"
        list="country-list"
        id="country-timezone"
        onChange={handleChangeContryName}
      />
      <datalist id="country-list">
        {abbList.map((abbName) => {
          return displayContoryName(timezone[abbName].timezone);
        })}
      </datalist>
    </>
  );
}
