const express = require("express");
const router = express.Router();
const {
  createUser,
  getCurrentUserInfo,
  findUser,
} = require("../controllers/userControllers");
const auth = require("../auth/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.post("/sign-up", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    user.balance = 0;
    user.save();
    return res.status(201).send({ message: "successfully registerd!" });
  } catch (e) {
    console.log("error", e);
    return res.send({
      message: "error: ",
    });
  }
});

router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //making jwt based on user data
    const user = await findUser("email", email);
    const payload = { email: user.email, id: user._id };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    if (user.password !== password) {
      return res.status(403).send({ message: "Wrong email or password" });
    }
    return res
      .status(201)
      .send({ message: "successfully logged in!", user, token });
  } catch {
    return res.status(404).send({
      message: "error in log in action! ",
    });
  }
});

module.exports = router;
