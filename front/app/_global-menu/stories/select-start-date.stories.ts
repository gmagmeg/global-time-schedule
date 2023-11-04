import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SelectStartDate } from "@app/_global-menu/select-start-date";
import { GlobalMenuState } from "../reducer/global-menu-state";

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
    startDateList: GlobalMenuState.startDateList,
    selectStartDate: GlobalMenuState.selectedDate,
  },
};
