import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SelectWeekDays } from "@app/_global-menu/select-week-days";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "GlobalMenu/SelectWeekDays",
  component: SelectWeekDays,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SelectWeekDays>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
