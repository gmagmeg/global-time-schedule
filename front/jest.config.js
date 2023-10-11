module.exports = {
  testPathIgnorePatterns: [
    "global-time-schedule/front/.next/",
    "global-time-schedule/front/node_modules/",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@app/(.*)$": "<rootDir>/app/$1",
    "^@editContents/(.*)$": "<rootDir>/app/_edit-contents/$1",
    "^@resultContents/(.*)$": "<rootDir>/app/_result-contents/$1",
    "^@sideMenu/(.*)$": "<rootDir>/app/_side-menu/$1",
  },
};
