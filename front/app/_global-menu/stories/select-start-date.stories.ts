import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SelectStartDate } from "@app/_global-menu/select-start-date";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "GlobalMenu/SelectStartDate",
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
    startDateList: [
      { mon: "22(日)", sun: "23(月)" },
      { mon: "29(日)", sun: "30(月)" },
      { mon: "6(日)", sun: "7(月)" },
    ],
  },
};
