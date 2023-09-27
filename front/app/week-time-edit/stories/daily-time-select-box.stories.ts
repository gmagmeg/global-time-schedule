import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DailyTimeSelectBox } from "@app/week-time-edit/daily-time-select-box";
import {
  FULL_HOUR_TUPLE,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types/daily-time-select-box";

const documentation = `時間を選択するセレクトボックスです。
12時間表記と24時間表記の2種類があります。
`;

const meta: Meta = {
  title: "WeekTimeEdit/DailyTimeSelectBox",
  component: DailyTimeSelectBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof DailyTimeSelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hours: HALF_HOUR_TUPLE,
    selected: {
      hour: "10",
      minute: "00",
    },
  },
};

export const FullHour: Story = {
  args: {
    hours: FULL_HOUR_TUPLE,
    selected: {
      hour: "22",
      minute: "00",
    },
  },
};
