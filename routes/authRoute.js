const express = require("express");
const router = express.Router();
const { createUser, findUser } = require("../controllers/userControllers");
const auth = require("../auth/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

router.post("/sign-up", async (req, res, next) => {
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  const isEmailTaken = await findUser("email", req.body.email);
  if (isEmailTaken) {
    return res.status(409).send({
      message: "Sorry, this email already exist in our database!",
    });
  }
  try {
    const user = await createUser(req.body);
    user.balance = 0;
    user.save();
    return res.status(201).send({ message: "Registered successfully!" });
  } catch {
    console.log("error", e);
    return res.send({
      message: "Something went wrong with your registration!",
    });
  }
});

router.post("/sign-in", async (req, res, next) => {
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  const { email, password } = req.body;
  try {
    const user = await findUser("email", email);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const payload = { email: user.email, id: user._id };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    if (user.password !== password) {
      return res.status(403).send({ message: "Wrong email or password" });
    }
    return res
      .status(201)
      .send({ message: "Successfully logged in!", user, token });
  } catch {
    return res.status(404).send({
      message: "Something went wrong with log in action! ",
    });
  }
});

router.delete("/sign-out", auth, async (req, res, next) => {
  if (req.session) {
    return req.session.destroy((err) => {
      if (err) {
        res.status(400).send({ message: "Unable to logout!" });
      } else {
        res.send({ message: "Logout succesfull!" });
      }
    });
  }
  // try {
  //   const user = await findUser("token", req.headers.authorization);
  //   user.token = null;
  //   user.save();
  //   return res.status(203).send({ message: "Logout succesfully??" });
  // } catch {
  //   return res.status(404).send({
  //     message: "Something went wrong with log out action!",
  //   });
  // }
});

module.exports = router;
