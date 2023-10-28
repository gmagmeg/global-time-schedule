import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../stories/**/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/**/stories/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
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
          "@const": path.resolve(__dirname, "../const/"),
          "@editContents": path.resolve(__dirname, "../app/_edit-contents/"),
          "@resultContents": path.resolve(
            __dirname,
            "../app/_result-contents/"
          ),
          "@sideMenu": path.resolve(__dirname, "../app/_side-menu/"),
          "@globalMenu": path.resolve(__dirname, "../app/_global-menu/"),
          "@": path.resolve(__dirname, "../"),
        },
      },
    };
  },
};
export default config;
