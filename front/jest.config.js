module.exports = {
  testPathIgnorePatterns: [
    "global-time-schedule/front/.next/",
    "global-time-schedule/front/node_modules/",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
    "^@app/(.*)$": "<rootDir>/app/$1",
    "^@lib/(.*)$": "<rootDir>/library/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
  },
};
