import type { Meta, StoryObj } from "@storybook/react";
import { DailyTimeSelectBox } from "@app/week-time-edit/daily-time-select-box";
import {
  FULL_HOUR_TUPLE,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types-week-time-edit";

const meta: Meta = {
  title: "WeekTimeEdit/DailyTimeSelectBox",
  component: DailyTimeSelectBox,
  tags: ["autodocs"],
} satisfies Meta<typeof DailyTimeSelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hours: FULL_HOUR_TUPLE,
    selected: {
      hour: "10",
      minute: "00",
    },
  },
};

export const HalfHour: Story = {
  args: {
    hours: HALF_HOUR_TUPLE,
    selected: {
      hour: "10",
      minute: "00",
    },
  },
};
