const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const {
  createTransaction,
  updateTransaction,
  getAllTransactions,
  deleteTransaction,
  getTransactionSummary,
} = require("../controllers/transactionController");
const { findUser } = require("../controllers/userControllers");

const auth = require("../auth/auth");

router.get("/", auth, async (req, res, next) => {
  const { id } = jwt.decode(req.headers.authorization);
  //TODO !!!!!!!!!!!!!!!//
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  try {
    const allTransactions = await getAllTransactions("userId", id);
    return res
      .status(200)
      .send({ message: "All of user transactions: ", allTransactions });
  } catch {
    return res.status(404).send({ messaage: "Somethin went wrong!" });
  }
});

router.post("/", auth, async (req, res, next) => {
  //TODO !!!!!!!!!!!!!!!//
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  // res.status(403).send({message: "User does not owns transaction!"})
  // res.status(404).send({message: "Transaction category not found!!"})
  // res.status(409).send({message: "Transaction category type does not match transaction type!"})
  const token = req.headers.authorization;
  const { id } = jwt.verify(token, secret);
  const user = await findUser("_id", id);
  try {
    let balance = 0;
    const transaction = await createTransaction(req.body);
    console.log(transaction.type.toLowerCase());
    if (transaction.type.toLowerCase() === "expense") {
      balance = user.balance - transaction.amount;
    } else if (transaction.type.toLowerCase() === "income") {
      balance = user.balance + transaction.amount;
      console.log(balance, "test");
    }
    transaction.userId = id;
    transaction.balanceAfter = balance;
    transaction.save();
    const userBalance = await getTransactionSummary(id, 0, 0);
    user.balance = userBalance.summary.balance.balance;
    user.save();
    return res
      .status(201)
      .send({ message: "Transaction created succesfully!", transaction });
  } catch (e) {
    return res.status(404).send({ message: "Something went wrong" });
  }
});

router.patch("/:id", auth, async (req, res, next) => {
  //TODO !!!!!!!!!!!!!!!//
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  // res.status(403).send({message: "User does not owns transaction!"})
  const { id } = jwt.decode(req.headers.authorization);
  const user = await findUser("_id", id);
  try {
    const transaction = await updateTransaction(req.params.id, req.body);
    const userBalance = await getTransactionSummary(id, 0, 0);
    user.balance = userBalance.summary.balance.balance;
    user.save();
    return res
      .status(200)
      .send({ message: "Succesfully updated transaction!", transaction });
  } catch {
    return res
      .status(404)
      .send({ message: "Something went wrong with updating!" });
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  //TODO !!!!!!!!!!!!!!!//
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  // res.status(401).send({message: "Bearer authorization failed!"})
  // res.status(403).send({message: "User does not owns transaction!"})
  const { id } = jwt.decode(req.headers.authorization);
  const user = await findUser("_id", id);
  try {
    await deleteTransaction(req.params.id);
    const userBalance = await getTransactionSummary(id, 0, 0);
    console.log(userBalance.summary.balance);
    user.balance = userBalance.summary.balance.balance;
    console.log(id);
    user.save();
    return res
      .status(204)
      .send({ messaage: "Succesfully deleted transaction!" });
  } catch {
    return res.status(404).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
