import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { HourOption } from "@app/week-time-edit/hour-option";

const documentation = `12時間表記と24時間表記の切り替えを行います。`;

const meta = {
  title: "WeekTimeEdit/HourOption",
  component: HourOption,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof HourOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: 12,
  },
};
