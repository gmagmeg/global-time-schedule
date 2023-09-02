import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@/app/date-edit/calendar";

const meta = {
  title: "DateEdit/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    targetDate: new Date(),
  },
};
