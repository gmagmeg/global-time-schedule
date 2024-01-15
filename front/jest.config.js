module.exports = {
  testPathIgnorePatterns: [
    "v-schedule/front/.next/",
    "v-schedule/front/node_modules/",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
    "^@lib/(.*)$": "<rootDir>/library/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};
