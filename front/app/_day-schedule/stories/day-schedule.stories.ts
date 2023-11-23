import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DaySchedule } from "@app/_day-schedule/day-schedule";
import { minutes, hour12, hour24 } from "../hooks/day-schedule-state";
import { dayScheduleState } from "../hooks/day-schedule-state";

const documentation = `12時間/AM、PMの選択と
24時間の選択ができるコンポーネント２つがある`;

const meta = {
  title: "DaySchedule/DaySchedule",
  component: DaySchedule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof DaySchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hour12: Story = {
  args: dayScheduleState,
};

export const Hour24: Story = {
  args: {
    ...dayScheduleState,
    timesOptions: {
      hourOptions: hour24,
      minuteOptions: minutes,
    },
  },
};
