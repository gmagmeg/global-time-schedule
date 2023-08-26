const axios = require("axios");
const { exit } = require("process");

const BASE_API_URL = "https://worldtimeapi.org/api/timezone";

const timezones = Intl.supportedValuesOf("timeZone");
const fileterTimezones = timezones.filter((tz) => tz.startsWith("Pacific/"));

let timeZoneInfoList = [];
const promises = fileterTimezones.map((timezone) => {
  return axios
    .get(`${BASE_API_URL}/${timezone}`)
    .then(({ data }) => {
      const { abbreviation, timezone, utc_offset } = data;
      return {
        abbreviation,
        timezone,
        utc_offset,
      };
    })
    .then((result) => {
      timeZoneInfoList.push(result);
    });
});

Promise.all(promises)
  .then(() => {
    console.log(JSON.stringify(timeZoneInfoList));
  })
  .catch((error) => {
    console.log(error);
  });
