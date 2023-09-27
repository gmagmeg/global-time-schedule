import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DailyTimeMeridiemRadio } from "@app/week-time-edit/daily-time-medium-radio";

const documentation = `AM/PMを選択するラジオボタンです。
event事返したいので、あえてutil-packageのChangeEventを使用していません。
`;

const meta = {
  title: "WeekTimeEdit/DailyTimeMeridiemRadio",
  component: DailyTimeMeridiemRadio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof DailyTimeMeridiemRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: "PM",
    youbi: "日",
  },
};
