import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DailyTimeEdit } from "@app/week-time-edit/daily-time-edit";

const documentation = `一日分の時間を編集するコンポーネントです。`;

const meta = {
  title: "WeekTimeEdit/DailyTimeEdit",
  component: DailyTimeEdit,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof DailyTimeEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    youbi: "日",
    timeMedium: "PM",
    selectedTimes: {
      hour: "10",
      minutes: "00",
    },
  },
};
