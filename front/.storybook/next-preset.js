const path = require("path");

module.exports = {
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          // ここに Next.js の alias 設定を追加
          "@app": path.resolve(__dirname, "../app"),
        },
      },
    };
  },
};
