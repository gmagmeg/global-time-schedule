import type { Meta, StoryObj } from "@storybook/react";
import { DateEdit } from "@/app/date-edit/date-edit";

const meta = {
  title: "DateEdit/DateEdit",
  component: DateEdit,
  tags: ["autodocs"],
} satisfies Meta<typeof DateEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayStatus: "display",
    currentDate: new Date(),
  },
};
