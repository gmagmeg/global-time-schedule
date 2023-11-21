import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SelectHourMinutes } from "@app/_day-schedule/select-hour-minutes";
import { hour12, minutes } from "@app/_day-schedule/hooks/day-schedule-state";

const documentation = `時間と分を選択するコンポーネントです。`;

const meta = {
  title: "DaySchedule/Sub/SelectHourMinutes",
  component: SelectHourMinutes,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SelectHourMinutes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedTime: {
      hour: 0,
      minute: 30,
    },
    selectTimeList: {
      hourOptions: hour12,
      minuteOptions: minutes,
    },
    placeholder: "--:--",
  },
};
