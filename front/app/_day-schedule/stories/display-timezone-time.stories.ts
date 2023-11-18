import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DisplayTimezoneTime } from "@app/_day-schedule/display-timezone-time";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "DaySchedule/DisplayTimezoneTime",
  component: DisplayTimezoneTime,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof DisplayTimezoneTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { displayTime: "2023-11-16 22:00" },
};

export const Empty: Story = {
  args: { displayTime: "" },
};
