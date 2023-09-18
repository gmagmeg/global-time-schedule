import type { Meta, StoryObj } from "@storybook/react";
import { TimeEdit } from "@/app/time-edit/time-edit";

const meta = {
  title: "TimeEdit/TimeEdit",
  component: TimeEdit,
  tags: ["autodocs"],
} satisfies Meta<typeof TimeEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
