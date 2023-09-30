import { FC, useState } from "react";
import "@app/globals.css";
import {
  TimeMeridiemString,
  TimeMeridiemOnChangeProps,
} from "@app/week-time-edit/types/time-meridiem-radio";
import {
  TimeSelectBoxPops,
  HourUnion,
  MinutesUnion,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types/time-select-box";
import { DailyTimeEdit } from "./daily-time-edit";
import { WeekUnion, WeekTuple } from "@app/week-time-edit/types/week-time-edit";
import { Grid } from "@chakra-ui/react";
import {
  HOUR_OPTION,
  HourOption as HourOptionType,
} from "@app/week-time-edit/types/hour-option";
import { HourOption } from "@app/week-time-edit/hour-option";

type WeekTimeEditProps = {
  timeSelectBox: TimeSelectBoxPops;
  week: WeekTuple;
};

export const WeekTimeEdit: FC<WeekTimeEditProps> = ({
  timeSelectBox,
  week, // 日、月の開始日の設定によって変動するため、propsで渡す
}) => {
  /**
   * @todo
   * useStateを使って、stateを管理する。
   * - ok AM/PMの切り替え
   * - ok 12時間制と24時間制の切り替え
   * - 時間選択
   *
   */

  /**
   * 各曜日のAM/PMの切り替え
   */
  const initTimeMeridiem: { youbi: WeekUnion; checked: TimeMeridiemString }[] =
    [
      { youbi: "日", checked: "AM" },
      { youbi: "月", checked: "PM" },
      { youbi: "火", checked: "PM" },
      { youbi: "水", checked: "PM" },
      { youbi: "木", checked: "PM" },
      { youbi: "金", checked: "PM" },
      { youbi: "土", checked: "PM" },
    ];
  const [timeMeridiem, setTimeMeridiem] = useState(initTimeMeridiem);
  const handleTimeMeridiem = ({
    value,
    targetYoubi,
  }: TimeMeridiemOnChangeProps) => {
    const newTimeMeridiem = timeMeridiem.map((timeMeridiem) => {
      if (timeMeridiem.youbi === targetYoubi) {
        return { youbi: timeMeridiem.youbi, checked: value };
      } else {
        return timeMeridiem;
      }
    });
    setTimeMeridiem(newTimeMeridiem);
  };

  /**
   * 各曜日の時間選択
   */
  const initTimeSelect: {
    youbi: WeekUnion;
    selected: { hour: HourUnion; minutes: MinutesUnion };
  }[] = [
    { youbi: "日", selected: { hour: "01", minutes: "00" } },
    { youbi: "月", selected: { hour: "02", minutes: "30" } },
    { youbi: "火", selected: { hour: "03", minutes: "00" } },
    { youbi: "水", selected: { hour: "04", minutes: "30" } },
    { youbi: "木", selected: { hour: "05", minutes: "00" } },
    { youbi: "金", selected: { hour: "06", minutes: "30" } },
    { youbi: "土", selected: { hour: "07", minutes: "00" } },
  ];
  const [timeSelect, setTimeSelect] = useState(initTimeSelect);

  const [timeSelectBoxHours, setTimeSelectBoxHours] = useState(HALF_HOUR_TUPLE);

  const onChangeHour = (targetYoubi: WeekUnion, value: HourUnion) => {
    const newTimeSelect = timeSelect.map((timeSelect) => {
      if (timeSelect.youbi === targetYoubi) {
        return {
          youbi: timeSelect.youbi,
          selected: { hour: value, minutes: timeSelect.selected.minutes },
        };
      } else {
        return timeSelect;
      }
    });
    setTimeSelect(newTimeSelect);
  };

  const onChangeMinutes = (targetYoubi: WeekUnion, value: MinutesUnion) => {
    const newTimeSelect = timeSelect.map((timeSelect) => {
      if (timeSelect.youbi === targetYoubi) {
        return {
          youbi: timeSelect.youbi,
          selected: { hour: timeSelect.selected.hour, minutes: value },
        };
      } else {
        return timeSelect;
      }
    });
    setTimeSelect(newTimeSelect);
  };

  /**
   * 12時間制と24時間制の切り替え
   */
  const [hourOption, setHourOption] = useState<HourOptionType>(
    HOUR_OPTION.half
  );
  const handleHourOption = (value: HourOptionType) => {
    setHourOption(value);
  };

  return (
    <>
      <HourOption checked={hourOption} onChange={handleHourOption} />
      <Grid
        mt={4}
        templateColumns="repeat(4, 1fr)"
        gap={1}
        className="week-time-select"
      >
        {week.map((youbi, index) => (
          <DailyTimeEdit
            key={youbi}
            targetYoubi={youbi}
            timeMeridiem={{
              checked: timeMeridiem[index].checked,
              hoursOption: hourOption,
              targetYoubi: youbi,
              onChange: handleTimeMeridiem,
            }}
            timeSelectBox={{
              targetYoubi: youbi,
              hours: timeSelectBoxHours,
              selected: timeSelect[index].selected,
              onChangeHour: onChangeHour,
              onChangeMinutes: onChangeMinutes,
            }}
          />
        ))}
      </Grid>
    </>
  );
};
