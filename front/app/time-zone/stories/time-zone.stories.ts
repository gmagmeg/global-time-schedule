import type { Meta, StoryObj } from "@storybook/react";
import { TimeZone } from "@app/time-zone/time-zone";

const meta = {
  title: "TimeZone/TimeZone",
  component: TimeZone,
  tags: ["autodocs"],
} satisfies Meta<typeof TimeZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
