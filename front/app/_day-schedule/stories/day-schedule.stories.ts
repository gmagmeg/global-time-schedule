import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DaySchedule } from "@/app/_week-schedule/day-schedule";

const documentation = `12時間/AM、PMの選択と
24時間の選択ができるコンポーネント２つがある`;

const meta = {
  title: "WeekSchedule/DaySchedule/DaySchedule",
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
  args: {
    baseDate: "2023-11-26",
    isSelectedDate: true,
    handleClickDayButton: () => {},
  },
};

export const Hour24: Story = {
  args: {
    baseDate: "2023-11-26",
    isSelectedDate: true,
    handleClickDayButton: () => {},
  },
};
