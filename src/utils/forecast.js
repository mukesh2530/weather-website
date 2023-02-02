const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ec7016f8b9f2352a84e88432df28441e&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Can not connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to fild locatio ", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +","+
        
          " It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.precip +
          " % chance of rain."
      );
    }
  });
};
module.exports = forecast;
