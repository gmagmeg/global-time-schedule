import { FC } from "react";
import { WeekTimeEdit } from "./week-time-edit/week-time-edit";
import { WeekTuple } from "./week-time-edit/types/week-time-edit";
import { DateEdit } from "./date-edit/date-edit";
import { CalendarDate, WeekStartDayString } from "./date-edit/types-date-edit";
export const EditContents: FC<{
  week: WeekTuple;
  currentDate: CalendarDate;
  weekStartDay: WeekStartDayString;
}> = ({ week, currentDate, weekStartDay }) => {
  return (
    <>
      <DateEdit currentDate={currentDate} weekStartDay={weekStartDay} />

      <WeekTimeEdit week={week} />
    </>
  );
};
