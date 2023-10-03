import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { TimeMeridiemRadio } from "@editContents/week-time-edit/time-medium-radio";

const documentation = `AM/PMを選択するラジオボタンです。
24時間表記の場合は選択できません。
`;

const meta = {
  title: "WeekTimeEdit/TimeMeridiemRadio",
  component: TimeMeridiemRadio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof TimeMeridiemRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: "PM",
    hoursOption: "12",
    targetYoubi: "日",
  },
};

export const Display24: Story = {
  args: {
    checked: "PM",
    hoursOption: "24",
    targetYoubi: "日",
  },
};
