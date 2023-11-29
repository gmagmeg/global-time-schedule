import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SelectStartDate } from "@app/_global-menu/select-start-date";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "GlobalMenu/Att/SelectStartDate",
  component: SelectStartDate,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SelectStartDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedStartDate: "2023-11-26",
    handleStartDate: () => {},
  },
};
