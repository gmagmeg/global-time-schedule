import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { GlobalMenu } from "@globalMenu/global-menu";

const documentation = `グローバルメニューのコンポーネントです。
固定ヘッダーになっており、スクロールしても常にヘッダーに固定されます。`;

const meta = {
  title: "GlobalMenu/GlobalMenu",
  component: GlobalMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof GlobalMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
