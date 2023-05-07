const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");

router.get("/", auth, async (req, res, next) => {});
