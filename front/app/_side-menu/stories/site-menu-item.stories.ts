import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SideMenuItem } from "@sideMenu/side-menu-item";

const documentation = `サイドメニューの１パーツ`;

const meta = {
  title: "SideMenu/SideMenuItem",
  component: SideMenuItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SideMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuName: "startDate",
    selected: true,
  },
};
