import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroupButton } from "@app/util-parts/radio-group-button";
import { TIME_MEDIUM_TUPLE } from "@/app/week-time-edit/types-week-time-edit";
import { replaceLineBreak } from "@/story-book-function";

const documentation = `汎用的なRadioButtonのコンポーネントです。
listの数によって、選択肢の数が増減します。
`;

const meta = {
  title: "utilParts/RadioGroupButton",
  component: RadioGroupButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof RadioGroupButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Tupleを解除するために、あえて一度配列にする
    list: [...TIME_MEDIUM_TUPLE],
    checked: "AM",
    direction: "row",
  },
};
