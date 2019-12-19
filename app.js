const express = require("express");
const path = require("path");
const helpers = require("./helpers");

const errorHandlers = require("./handlers/errorHandlers");

// create our Express app
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/public", express.static(path.join(__dirname, "public")));

// Raw requests and turns into properties on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.h = helpers;
  next();
});

// Routes file
const web = require("./routes/web");
app.use("/", web);
const api = require("./routes/api");
app.use("/api", api);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === "development") {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
