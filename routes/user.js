const express = require("express");
const router = express.Router();
const createUser = require("../controllers/userControllers");

router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res, next) => {
  try {
    await createUser(req.body);
    return res.code(201).send({ message: "success" });
  } catch (e) {
    return res.send({ message: e });
  }
});

module.exports = router;
