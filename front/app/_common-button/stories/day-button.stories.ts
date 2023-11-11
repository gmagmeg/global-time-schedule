import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DayButton } from "@app/_common-button/day-button";
import { customDayjs } from "@/library/dayjs";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "CommonButton/DayButton",
  component: DayButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof DayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSelected: true,
    date: customDayjs(),
  },
};

export const NotSelected: Story = {
  args: {
    isSelected: false,
    date: customDayjs(),
  },
};
