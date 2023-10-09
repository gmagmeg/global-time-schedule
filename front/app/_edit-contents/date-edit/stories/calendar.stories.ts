import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@editContents/date-edit/calendar";
import { replaceLineBreak } from "@/story-book-function";

const documentation = `日付を選択するためのカレンダーコンポーネントです。
calendarTypeは元々ライブラリが持っているpropsになります。
`;

const meta = {
  title: "WeekTimeEdit/DateEdit/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    targetDate: new Date(),
  },
};
