const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
//Define path for express config
const publicDirectoryPath = path.join(__dirname, "./../public");
const viewsPath = path.join(__dirname, "./../templates/views");
const partialsPath = path.join(__dirname, "./../templates/partials");

// Setup handlebars and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather ",
    name: "Mukesh Pal",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mukesh Pal",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Mukesh Pal",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide the address" });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mukesh Pal",
    errorMessage: "content not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mukesh Pal",
    errorMessage: "Page not found",
  });
});
app.listen(7000, () => {
  console.log("Connecting to port 7000 on server!");
});
