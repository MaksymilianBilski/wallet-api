const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const {
  getTransactionCategories,
  getStatistics,
} = require("../controllers/transactionController");

router.get("/", auth, async (req, res, next) => {
  const { id } = jwt.decode(req.headers.authorization);
  try {
    const categories = await getTransactionCategories("userId", id);
    return res
      .status(200)
      .send({ message: "Succesfully send categories!", categories });
  } catch {
    return res.status(404).send({ message: "Something went wrong!" });
  }
});

router.get("/statistics", auth, async (req, res, next) => {
  const { id } = jwt.decode(req.headers.authorization);
  try {
    const stats = await getStatistics("userId", id);
    return res
      .status(200)
      .send({ message: "Succesfully send categories!", stats });
  } catch {
    return res.status(404).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
