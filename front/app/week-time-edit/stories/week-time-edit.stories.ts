import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { WeekTimeEdit } from "@app/week-time-edit/week-time-edit";
import { FULL_HOUR_TUPLE } from "../types/time-select-box";

const documentation = `1週間分の時間を編集するコンポーネントです。`;

const meta = {
  title: "WeekTimeEdit/WeekTimeEdit",
  component: WeekTimeEdit,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof WeekTimeEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    timeSelectBox: {
      hours: FULL_HOUR_TUPLE,
      selected: {
        hour: "11",
        minutes: "00",
      },
      onChangeHour: () => {},
      onChangeMinutes: () => {},
    },
    week: ["日", "月", "火", "水", "木", "金", "土"],
  },
};
