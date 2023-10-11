import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SideMenu } from "@sideMenu/side-menu";

const documentation = `ここにコンポーネントの説明を書く`;

const meta = {
  title: "SideMenu/SideMenu",
  component: SideMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
