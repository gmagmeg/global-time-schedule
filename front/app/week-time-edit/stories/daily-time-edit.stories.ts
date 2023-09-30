import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { DailyTimeEdit } from "@app/week-time-edit/daily-time-edit";
import {
  FULL_HOUR_TUPLE,
  HALF_HOUR_TUPLE,
} from "@app/week-time-edit/types/time-select-box";

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

export const Display12: Story = {
  args: {
    targetYoubi: "日",
    timeMeridiem: {
      checked: "PM",
      hoursOption: "12",
      targetYoubi: "日",
      onChange: () => {},
    },
    timeSelectBox: {
      targetYoubi: "日",
      hours: HALF_HOUR_TUPLE,
      selected: {
        hour: "11",
        minutes: "00",
      },
      onChangeHour: () => {},
      onChangeMinutes: () => {},
    },
  },
};

export const Display24: Story = {
  args: {
    ...Display12.args,
    timeMeridiem: {
      ...Display12.args.timeMeridiem,
      hoursOption: "24",
    },
    timeSelectBox: {
      ...Display12.args.timeSelectBox,
      hours: FULL_HOUR_TUPLE,
      selected: {
        hour: "23",
        minutes: "00",
      },
    },
  },
};
