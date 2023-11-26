import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DisplayTimezoneTime } from "@app/_day-schedule/display-timezone-time";
import { dayScheduleState } from "../hooks/day-schedule-state";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "DaySchedule/Sub/DisplayTimezoneTime",
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
  args: {
    startDate: "2023-11-16",
    selectedTime: dayScheduleState.selectedTime,
    timeZones: dayScheduleState.timeZones,
  },
};

export const Empty: Story = {
  args: {
    startDate: "",
    selectedTime: dayScheduleState.selectedTime,
    timeZones: dayScheduleState.timeZones,
  },
};
