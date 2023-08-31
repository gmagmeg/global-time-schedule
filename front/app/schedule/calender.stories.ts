import type { Meta, StoryObj } from "@storybook/react";
import { Calender } from "@app/schedule/calender";

const meta = {
  title: "Schedule/Calender",
  component: Calender,
  tags: ["autodocs"],
} satisfies Meta<typeof Calender>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
