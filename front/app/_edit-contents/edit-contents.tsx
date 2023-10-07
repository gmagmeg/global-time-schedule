import { FC } from "react";
import { WeekTimeEdit } from "./week-time-edit/week-time-edit";
import { WeekTuple } from "./week-time-edit/types/week-time-edit";
import { DateEdit } from "./date-edit/date-edit";
import { CalendarDate, WeekStartDayString } from "./date-edit/types-date-edit";
import { Heading, Icon, Spacer } from "@chakra-ui/react";
import { SlCalender } from "react-icons/sl";
import { BiTimeFive } from "react-icons/bi";

export const EditContents: FC<{
  week: WeekTuple;
  currentDate: CalendarDate;
  weekStartDay: WeekStartDayString;
}> = ({ week, currentDate, weekStartDay }) => {
  return (
    <>
      <Heading as="h2" size={"md"}>
        <Icon as={SlCalender} mt={4} mr={2} />
        開始日選択
      </Heading>
      <Spacer mt={2} />
      <DateEdit currentDate={currentDate} weekStartDay={weekStartDay} />

      <Heading as="h2" size={"md"}>
        <Icon as={BiTimeFive} mt={8} mr={2} />
        曜日ごとの時間設定
      </Heading>
      <Spacer mt={2} />
      <WeekTimeEdit week={week} />
    </>
  );
};
