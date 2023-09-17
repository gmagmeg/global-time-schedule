const util = require("util");
const timezones = require("./timezone.json");

const timeZoneInfoList = timezones.map(({ timezone, abbreviation }) => {
  if (abbreviation.match(/^[\+|\-]/)) {
    return;
  }

  return [timezone, abbreviation];
});

console.log(
  util.inspect(
    timeZoneInfoList.filter((item) => item !== undefined),
    {
      showHidden: false,
      depth: null,
      maxArrayLength: null,
    }
  )
);
