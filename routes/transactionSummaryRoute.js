const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const {
  getTransactionSummary,
} = require("../controllers/transactionController");

router.get("/", auth, async (req, res, next) => {
  const { month, year } = req.query;
  const { id } = jwt.decode(req.headers.authorization);
  try {
    const transactionSummary = await getTransactionSummary(
      id,
      Number(year),
      Number(month)
    );
    return res.status(200).send({
      message: "Successfuly get transaction summary!",
      transactionSummary,
    });
  } catch {
    return res.status(400).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
