const dotenv = require("dotenv").config({ path: "./config.env" }); //for manage env variable in development
const fs = require("fs");
const { dbConnection } = require("./config/dbConnection");
// to coloring logs in console
require("colors");

const app = require("./app.js");
const debug = require("debug")("Highway-Access:server");

// The port used by the Node.js debugger when enabled.
process.debugPort = 5858;

// connect to db
dbConnection();

/*
 * Get port from environment and store in Express.
 */
const PORT = normalizePort(process.env.PORT || "5000");

// set port
app.set("port", PORT);

const server = app.listen(PORT, () => {
  console.log(`################## Highway App}`.blue.bold);
});

server.on("error", onError);
server.on("listening", onListening);

// handle all uncaught Exception
process.on("uncaughtException", (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin} \n`
  );
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  mongoose.connection.close(() => {
    console.log(
      "✗ Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
  server.close(() => {
    process.exit(1);
  });
});

// when user pressing Ctrl+C
process.once("SIGINT", function (code) {
  console.log("👋 SIGINT RECEIVED. Shutting down server");
  mongoose.connection.close(() => {
    console.log(
      "✗ Mongoose default connection disconnected through app termination".red
    );
    process.exit(0);
  });
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});

// signal that is sent to request the process terminates
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  mongoose.connection.close(() => {
    console.log(
      "✗ Mongoose default connection disconnected through app termination".red
    );
    process.exit(0);
  });
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});

process.on("exit", (code) => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination".red
    );
    process.exit(0);
  });
  console.log("Process exit event with code: ", code);
});

process.on("warning", (warning) => {
  console.warn(warning.name); // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack); // Print the stack trace
});

// method returns the number of seconds the current Node.js process has been running
console.log(
  `The time needed to running process ${Math.floor(process.uptime())}`
);

console.log(`This platform is ${process.platform}`);

console.log(`This processor architecture is ${process.arch}`);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log(`################## running on ${bind}`.cyan.bold);
}
