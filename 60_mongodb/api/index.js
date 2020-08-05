const { Router } = require("express");
const router = Router();

router.use("/music", require("./music")); // ./music으로 해도 알아서 찾아감
router.use("/movie", require("./movie"));
router.use("/user", require("./user")); //user/index로 찾아가도록

module.exports = router;
