module.exports = {
  testPathIgnorePatterns: [
    "global-time-schedule/front/.next/",
    "global-time-schedule/front/node_modules/",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@app/(.*)$": "<rootDir>/app/$1",
    "^@globalMenu/(.*)$": "<rootDir>/app/_global-menu/$1",
  },
};
