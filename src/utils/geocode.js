const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiMjUzMG1hIiwiYSI6ImNsNTZjYTRybTAyNGozZHFsYTBqOTY0bXMifQ.WSILEC5hC5H_IOQUNk42iQ&limit=1";
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect  the location server!", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location,try another Search!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
    // console.log(body.features);
  });
};
module.exports = geocode;
