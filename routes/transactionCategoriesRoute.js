const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const {
  getTransactionCategories,
} = require("../controllers/transactionController");

router.get("/", auth, async (req, res, next) => {
  //TODO!!!! res status codes
  const { id } = jwt.decode(req.headers.authorization);
  try {
    const categories = await getTransactionCategories("userId", id);
    return res
      .status(201)
      .send({ message: "Succesfully send categories!", categories });
  } catch {
    return res.status(404).send({ message: "Succesfully send categories!" });
  }
});

module.exports = router;
