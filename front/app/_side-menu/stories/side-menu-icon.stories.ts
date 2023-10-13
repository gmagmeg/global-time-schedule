import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SideMenuIcon } from "@sideMenu/side-menu-icon";

const documentation = `サイドメニューのアイコン一覧`;

const meta = {
  title: "SideMenu/SideMenuIcon",
  component: SideMenuIcon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SideMenuIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuName: "startDate",
  },
};
