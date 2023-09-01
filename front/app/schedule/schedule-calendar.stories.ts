import type { Meta, StoryObj } from "@storybook/react";
import { ScheduleCalendar } from "@app/schedule/schedule-calendar";

const meta = {
  title: "Schedule/ScheduleCalendar",
  component: ScheduleCalendar,
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduleCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
