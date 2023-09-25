import type { Meta, StoryObj } from "@storybook/react";
import { YoubiRadio } from "@/app/date-edit/youbi-radio";
import { replaceLineBreak } from "@/story-book-function";

const documentation = `開始日を指定するための曜日選択コンポーネントです。
`;

const meta = {
  title: "DateEdit/YoubiRadio",
  component: YoubiRadio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof YoubiRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    weekStartDay: "Sun",
    onChangeRadio: (nextString: string): void => {},
  },
};
