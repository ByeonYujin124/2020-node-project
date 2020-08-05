//const express = require("express");
//const router = express.Router();
//비구조화 할당
const { Router } = require("express"); //express.Router()
const router = Router();
const ctrl = require("./user.ctrl");

router.get("/signup", ctrl.showSignupPage); //회원가입 페이지 보여주기
router.get("/login", ctrl.showLoginPage);
router.get("/logout", ctrl.logout);
router.post("/signup", ctrl.signup); //회원가입
router.post("/login", ctrl.login);

module.exports = router;
