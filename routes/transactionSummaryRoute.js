const express = require("express");
const auth = require("../auth/auth");
const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  const { month, year } = req.query;
  try {
  } catch {}
});

module.exports = router;
