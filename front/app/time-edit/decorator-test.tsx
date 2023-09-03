// .storybook/preview.tsx

import { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default preview;
