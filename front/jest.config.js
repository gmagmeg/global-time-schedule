module.exports = {
  testPathIgnorePatterns: ["front/.next/", "front/node_modules/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@app/(.*)$": "<rootDir>/app/$1",
  },
};
