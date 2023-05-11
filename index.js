const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./routes/authRoute");
const usersRouter = require("./routes/userRoute");
const transactionsRouter = require("./routes/transactionsRoute");
const transactionsSummaryRouter = require("./routes/transactionSummaryRoute");
const transactionsCategoriesRouter = require("./routes/transactionCategoriesRoute");

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

const port = normalizePort(process.env.PORT || "3000");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error);
  }
};

app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

app.get("/", (req, res, next) => {
  res.send({ title: "testing" });
});
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/transaction-categories", transactionsCategoriesRouter);
app.use("/api/transactions-summary", transactionsSummaryRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

connectDb().then(() => {
  app.listen(port, () => {
    console.log("app is running on port: ", port);
  });
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
