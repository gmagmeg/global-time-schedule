import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@/app/schedule/calendar";

const meta = {
  title: "Schedule/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
