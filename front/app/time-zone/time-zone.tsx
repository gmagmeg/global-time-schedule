"use client";

import { FormControl, Input, FormLabel } from "@chakra-ui/react";
import { FC, useState } from "react";
import { timezone as timezoneNoneType } from "./timezone-groupAbb";
import { timezoneCountry } from "./timezone-country";
import { InputChangeEvent } from "@app/event-types-alias";

type TimezoneType = {
  [key: string]: {
    utc_offset: string;
    timezone: string[];
  };
};

export const TimeZone: FC<{}> = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("" as string);

  const timezone: TimezoneType = timezoneNoneType;
  const abbList = Object.keys(timezone);

  // タイムゾーンを変更した時の処理
  const handleChangeTimezone = ({ target }: InputChangeEvent) => {
    setSelectedTimezone(target.value);
  };

  // 国名を選択した時、略称名を一致するものに変更する
  const handleChangeCountryName = ({ target }: InputChangeEvent) => {
    const countryName = target.value;
    const abbName = timezoneCountry.get(countryName);
    if (abbName) {
      setSelectedTimezone(abbName);
    }
  };

  // タイムゾーンの略称名で表示する
  const displayName = (abbTimezone: string): string => {
    return timezone[abbTimezone].utc_offset;
  };

  // 国名を表示する
  const displayCountryName = (countryNameList: string[]): JSX.Element[] => {
    return countryNameList.map((countryName) => {
      return (
        <option key={countryName} value={countryName}>
          {countryName}
        </option>
      );
    });
  };

  return (
    <FormControl>
      <FormLabel>略称名</FormLabel>
      <Input
        type="text"
        list="timezone-list"
        id="timezone"
        onChange={handleChangeTimezone}
        width={200}
        value={selectedTimezone}
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

      <FormLabel>国名</FormLabel>
      <Input
        type="text"
        list="country-list"
        id="country-timezone"
        width={200}
        onChange={handleChangeCountryName}
      />
      <datalist id="country-list">
        {abbList.map((abbName) => {
          return displayCountryName(timezone[abbName].timezone);
        })}
      </datalist>
    </FormControl>
  );
}
