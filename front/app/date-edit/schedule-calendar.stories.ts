import type { Meta, StoryObj } from "@storybook/react";
import { ScheduleCalendar } from "@/app/date-edit/schedule-calendar";

const meta = {
  title: "DateEdit/ScheduleCalendar",
  component: ScheduleCalendar,
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduleCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
