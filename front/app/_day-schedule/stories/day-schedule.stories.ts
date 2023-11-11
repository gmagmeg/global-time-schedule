import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DaySchedule } from "@app/_day-schedule/day-schedule";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "DaySchedule",
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

export const Default: Story = {
  args: {},
};
