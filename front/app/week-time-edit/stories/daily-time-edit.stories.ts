import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DailyTimeEdit } from "@app/week-time-edit/daily-time-edit";
import { FULL_HOUR_TUPLE } from "@app/week-time-edit/types/daily-time-select-box";

const documentation = `一日分の時間を編集するコンポーネントです。`;

const meta = {
  title: "WeekTimeEdit/DailyTimeEdit",
  component: DailyTimeEdit,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof DailyTimeEdit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    timeMeridiem: {
      checked: "PM",
      targetYoubi: "日",
      onChange: () => {},
    },
    timeSelectBox: {
      hours: FULL_HOUR_TUPLE,
      selected: {
        hour: "11",
        minutes: "00",
      },
      onChangeHour: () => {},
      onChangeMinutes: () => {},
    },
  },
};
