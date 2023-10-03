import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { EditContents } from "@editContents/edit-contents";
import { WEEK } from "@editContents/week-time-edit/types/week-time-edit";

const documentation = `ここにコンポーネントの説明を書く`;

const meta = {
  title: "EditContents/EditContents",
  component: EditContents,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof EditContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    week: WEEK,
    currentDate: new Date("2022-01-02T00:00:00"),
    weekStartDay: "Sun",
  },
};
