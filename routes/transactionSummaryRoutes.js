const express = require("express");
const auth = require("../auth/auth");
const router = express.Router();

router.get("/", auth, async (req, res, next) => {});
