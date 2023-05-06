var express = require("express");
var router = express.Router();
const { createTransaction } = require("../controllers/transactionController");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Wallet app" });
});

router.post("/", async (req, res, next) => {
  try {
    await createTransaction(req.body);
    return res
      .status(201)
      .send({ message: "Transaction created succesfully!" });
  } catch (e) {
    return res.status(404).send({ message: "Something went wrong" });
  }
});

module.exports = router;
