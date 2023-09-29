import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { TimeSelectBox } from "@app/week-time-edit/time-select-box";
import {
  FULL_HOUR_TUPLE,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types/time-select-box";

const documentation = `時間を選択するセレクトボックスです。
12時間表記と24時間表記の2種類があります。
`;

const meta: Meta = {
  title: "WeekTimeEdit/TimeSelectBox",
  component: TimeSelectBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof TimeSelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    targetYoubi: "日",
    hours: HALF_HOUR_TUPLE,
    selected: {
      hour: "10",
      minute: "00",
    },
  },
};

export const FullHour: Story = {
  args: {
    targetYoubi: "月",
    hours: FULL_HOUR_TUPLE,
    selected: {
      hour: "22",
      minute: "00",
    },
  },
};
