import type { StorybookConfig } from "@storybook/nextjs";
const path = require("path");

const config: StorybookConfig = {
  stories: ["../app/**/stories/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: {},
    },
  },
  core: {},
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (baseConfig) => {
    return {
      ...baseConfig,
      resolve: {
        ...baseConfig.resolve,
        alias: {
          ...baseConfig.resolve?.alias,
          "@app": path.resolve(__dirname, "../app/"),
          "@lib": path.resolve(__dirname, "../library/"),
          "@": path.resolve(__dirname, "../"),
        },
      },
    };
  },
};
export default config;
