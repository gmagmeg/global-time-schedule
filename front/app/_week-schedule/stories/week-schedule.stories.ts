import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { WeekSchedule } from "@app/_week-schedule/week-schedule";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "WeekSchedule",
  component: WeekSchedule,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof WeekSchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startDate: "2023-11-26",
  },
};
