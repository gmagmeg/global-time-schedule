import type { Meta, StoryObj } from "@storybook/react";
import { TimeZone } from "@app/_edit-contents/time-zone/time-zone";

const meta = {
  title: "EditContents/TimeZone/TimeZone",
  component: TimeZone,
  tags: ["autodocs"],
} satisfies Meta<typeof TimeZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
