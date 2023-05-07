const express = require("express");
const router = express.Router();

const {
  createTransaction,
  updateTransaction,
  getAllTransactions,
  findTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { findUser } = require("../controllers/userControllers");

const auth = require("../auth/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Wallet app" });
// });

router.get("/", auth, async (req, res, next) => {
  //TODO !!!!!!!!!!!!!!!//
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  // res.status(401).send({message: "Bearer authorization failed!"})
  try {
    const allTransactions = await getAllTransactions("userId", req.body.id);
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
  // res.status(401).send({message: "Bearer authorization failed!"})
  // res.status(403).send({message: "User does not owns transaction!"})
  // res.status(404).send({message: "Transaction category not found!!"})
  // res.status(409).send({message: "Transaction category type does not match transaction type!"})
  const token = req.headers.authorization;
  const { id } = jwt.verify(token, secret);
  const user = await findUser("_id", id);
  try {
    const transaction = await createTransaction(req.body);
    const balance = user.balance - transaction.amount;
    transaction.userId = id;
    transaction.balanceAfter = balance;
    transaction.save();
    user.balance = balance;
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
  // res.status(401).send({message: "Bearer authorization failed!"})
  // res.status(403).send({message: "User does not owns transaction!"})
  try {
    const transaction = await updateTransaction(req.params.id, req.body);
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
  try {
    const transaction = await deleteTransaction(req.params.id);
    if (transaction) {
      return res.status(404).send({ messaage: "Transaction not found!" });
    }
    return res
      .status(204)
      .send({ messaage: "Succesfully deleted transaction!" });
  } catch {
    return res.status(404).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
