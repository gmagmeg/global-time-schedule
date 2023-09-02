import type { Meta, StoryObj } from "@storybook/react";
import { WeekTimeEdit } from "@/app/time-edit/week-time-edit";

const meta = {
  title: "TimeEdit/WeekTimeEdit",
  component: WeekTimeEdit,
  tags: ["autodocs"],
} satisfies Meta<typeof WeekTimeEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    week: ["日", "月", "火", "水", "木", "金", "土"],
  },
};
