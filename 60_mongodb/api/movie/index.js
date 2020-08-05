//const express = require("express");
//const router = express.Router();
//비구조화 할당
const { Router } = require("express"); //express.Router()
const router = Router();
const ctrl = require("./movie.ctrl");

//목록 조회
router.get("/", ctrl.list);
//등록 페이지 보여주기
router.get("/new", ctrl.showCreatePage);
//상세 조회
router.get("/:id", ctrl.checkId, ctrl.detail);
//수정 페이지 보여주기
router.get("/:id/edit", ctrl.checkId, ctrl.showUpdatePage);
//등록
router.post("/", ctrl.create);
//수정
router.put("/:id", ctrl.checkId, ctrl.update);
//삭제
router.delete("/:id", ctrl.checkId, ctrl.remove);

module.exports = router;
