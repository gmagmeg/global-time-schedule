/**
 * @packageDocumentation
 */

import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SelectHourMinutes } from "@app/_day-schedule/select-hour-minutes";
import { DayScheduleAction } from "../hooks/day-schedule-reducer";
import { dayScheduleState } from "../hooks/day-schedule-state";

const documentation = `時間と分を選択するコンポーネントです。`;

const meta = {
  title: "WeekSchedule/DaySchedule/SelectHourMinutes",
  component: SelectHourMinutes,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SelectHourMinutes>;

export default meta;
type Story = StoryObj<typeof meta>;

const { selectedTime } = dayScheduleState;

export const Default: Story = {
  args: {
    selectedTime: selectedTime,
    placeholder: "--:--",
    handleChange: (action: DayScheduleAction) => {
      console.log(action);
    },
  },
};
