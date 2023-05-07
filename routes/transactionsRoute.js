var express = require("express");
var router = express.Router();
const {
  createTransaction,
  updateTransaction,
  findTransaction,
} = require("../controllers/transactionController");
const { findUser } = require("../controllers/userControllers");

const auth = require("../auth/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

router.get("/", function (req, res, next) {
  res.render("index", { title: "Wallet app" });
});

router.post("/", auth, async (req, res, next) => {
  // from addTransaction logic(frontend) should come all information about transaction
  const token = req.headers.authorization;
  const { id } = jwt.verify(token, secret);
  const user = await findUser("_id", id);
  try {
    const transaction = await createTransaction(req.body);
    const balance = user.balance - transaction.amount;
    //link transaction to user id/calculate balanceAfter property
    transaction.userId = id;
    transaction.balanceAfter = balance;
    transaction.save();
    //calculating user balance property
    user.balance = balance;
    user.save();
    return res
      .status(201)
      .send({ message: "Transaction created succesfully!", transaction });
  } catch (e) {
    return res.status(404).send({ message: "Something went wrong" });
  }
});

router.patch("/:id", async (req, res, next) => {});

module.exports = router;
