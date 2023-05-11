#!/usr/bin/env node

/**
 * Module dependencies.
 */
const { MongoClient } = require("mongodb");
const app = require("..");
const debug = require("debug")("wallet-api:server");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI;
// const client = new MongoClient(uri);

// app.get("/items/:my_item", async (req, res) => {
//   let item = await client.collection("users").findOne({ email: "malpa@o2.pl" });
//   return res.json(item);
// });

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    handleError(error);
  }
};
connectDb();
// client.connect((err) => {
//   if (err) {
//     console.error(err);
//     return false;
//   }
//   // connection to mongo is successful, listen for requests
//   app.listen(port, () => {
//     console.log("listening for requests");
//   });
// });

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

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

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

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
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log("listening on port: ", port);
}
