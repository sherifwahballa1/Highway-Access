const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const compression = require("compression");
const rfs = require("rotating-file-stream");
const mongoSanitize = require("express-mongo-sanitize"); // to prevent nosql injection
const xxs = require("xss-clean"); // filter input from users to prevent xss attacks

// APIS
const { CarAPI } = require("./routes/car");
const { CardAPI } = require("./routes/card");

const { EmployeeAPI } = require("./routes/employee");

const { Error4O4, Error500 } = require("./modules/global-errors");

const app = express();
app.enable("trust proxy");

// ===================  helmet ======================
// Used to setting various HTTP headers to secure the app
app.use(
  helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: false, // to hide which technology used in the app
    frameguard: {
      action: "deny",
    },
  })
);
app.use(helmet.noSniff());
// Sets "X-Download-Options: noopen"
app.use(helmet.ieNoOpen());
// Sets "X-XSS-Protection: 0"
app.use(helmet.xssFilter());
// Sets "X-Permitted-Cross-Domain-Policies: by-content-type"
app.use(
  helmet.permittedCrossDomainPolicies({
    permittedPolicies: "by-content-type", // none
  })
);

// Parses incoming requests with JSON payloads
app.use(express.json());

// body parser
app.use(
  bodyParser.json({
    limit: "1mb", // the maximum request body size
  })
);

app.use(
  // looks at requests where the Content-Type header matches the type option
  bodyParser.urlencoded({
    extended: false,
  })
);

// Pretty API Responses
app.set("json spaces", 4);

morgan.token("remote-addr", function (req) {
  return req.headers["x-forwarded-for"] || req.ip;
});

// log the time taken in each request
app.use(morgan("tiny"));

// Data sanitization against NoSQL Query injection
app.use(mongoSanitize()); // prevent from NoSQL injection like (email:{"$gt":""}) in body

// Data sanitization against cross-site scripting (XSS)
app.use(xxs()); // prevent if code contain html code or js code in body and convert it to symbols known

// attempt to compress response bodies for all request that traverse through the middleware
app.use(compression());

// create a write stream (in append mode) to write the requests in file
let log_Stream = rfs.createStream("morgan_access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

app.use(
  morgan("combined", {
    stream: log_Stream,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome -- Highway access App" });
});

app.use("/api/car", CarAPI);
app.use("/api/card", CardAPI);

// FOR testing and insert random employees
app.use("/api/employee", EmployeeAPI);

// handling global Errors
app.use(Error4O4);
app.use(Error500);

module.exports = app;
