import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { MainContents } from "@app/_main-contents/main-contents.tsx";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "MainContents/MainContents",
  component: MainContents,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof MainContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
