import type { Meta, StoryObj } from "@storybook/react";
import { ScheduleCalender } from "@app/schedule/schedule-calender";

const meta = {
  title: "Schedule/Calender",
  component: ScheduleCalender,
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduleCalender>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
