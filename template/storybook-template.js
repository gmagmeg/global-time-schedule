import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { __COMPONENT_NAME__ } from "__COMPONENT_PATH__";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "",
  component: __COMPONENT_NAME__,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof __COMPONENT_NAME__>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { },
};
