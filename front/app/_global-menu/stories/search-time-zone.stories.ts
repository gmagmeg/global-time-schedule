import type { Meta, StoryObj } from "@storybook/react";
import { replaceLineBreak } from "@/story-book-function";
import { SearchTimeZone } from "@app/_global-menu/search-time-zone";

const documentation = `コンポーネントの説明`;

const meta = {
  title: "GlobalMenu/Att/SearchTimeZone",
  component: SearchTimeZone,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: replaceLineBreak(documentation),
      },
    },
  },
} satisfies Meta<typeof SearchTimeZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
