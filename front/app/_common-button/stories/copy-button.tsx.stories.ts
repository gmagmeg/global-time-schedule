import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { CopyButton } from "@app/_common-button/copy-button";

const documentation = `コンテンツのコピーを行うボタン`;

const meta = {
  title: "CommonButton/CopyButton.tsx",
  component: CopyButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    enableCopy: true,
  },
};

export const DisableCopy: Story = {
  args: {
    enableCopy: false,
  },
};
