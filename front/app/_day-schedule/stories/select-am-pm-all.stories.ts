import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SelectAmPmAll } from "@app/_day-schedule/select-am-pm-all";
import { timeTypeOptions } from "../hooks/day-schedule-state";

const documentation = `コンポーネントの説明`;

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

export const Default: Story = {
  args: {
    timeTypeOptions: timeTypeOptions,
    selectedTimeType: "PM",
  },
};
