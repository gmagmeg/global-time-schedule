import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SelectAmPmAll } from "@app/_day-schedule/select-am-pm-all";
import { dayScheduleState, timeTypeOptions } from "../hooks/day-schedule-state";

const documentation = `AM/PM/24hを切り替える`;

const meta = {
  title: "DaySchedule/Sub/SelectAmPmAll",
  component: SelectAmPmAll,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SelectAmPmAll>;

export default meta;
type Story = StoryObj<typeof meta>;
 
const { selectedTime } = dayScheduleState

export const Default: Story = {
  args: {
    timeTypeOptions: timeTypeOptions,
    selectedTimeType: selectedTime.timeType,
  },
};
