import type { Meta, StoryObj } from "@storybook/react";
import { DateEdit } from "@/app/date-edit/date-edit";

import { replaceLineBreak } from "@/story-book-function";

const documentation = `日付を選択するコンポーネントで、次の選択形式をサポートしています。
- Calendarによる選択
- inputによる直接入力
`;

const meta = {
  title: "DateEdit/DateEdit",
  component: DateEdit,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof DateEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayStatus: "display",
    currentDate: new Date(),
  },
};