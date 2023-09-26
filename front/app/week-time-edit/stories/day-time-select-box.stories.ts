import type { Meta, StoryObj } from "@storybook/react";
import { DayTimeSelectBox } from "@app/week-time-edit/day-time-select-box";
import {
  FULL_HOUR_TUPLE,
  HALF_HOUR_TUPLE,
  MINUTES,
} from "@app/week-time-edit/types-week-time-edit";

const meta: Meta = {
  title: "WeekTimeEdit/DayTimeSelectBox",
  component: DayTimeSelectBox,
  tags: ["autodocs"],
} satisfies Meta<typeof DayTimeSelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hours: FULL_HOUR_TUPLE,
    minutes: MINUTES,
    selected: {
      hour: "10",
      minute: "00",
    },
    youbi: "日",
  },
};

export const HalfHour: Story = {
  args: {
    hours: HALF_HOUR_TUPLE,
    minutes: MINUTES,
    selected: {
      hour: "10",
      minute: "00",
    },
    youbi: "日",
  },
};
