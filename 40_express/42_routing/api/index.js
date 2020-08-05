// 비구조화 할당
// const express = require("express");
// const router = express.Router();
const { Router } = require("express");
const router = Router();

router.use("/music", require("./music"));
router.use("/movie", require("./movie"));

module.exports = router;