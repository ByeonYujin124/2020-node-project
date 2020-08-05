const MusicModel = require("../../models/music.js");
const mongoose = require("mongoose");

//id유효성 체크하는 함수
const checkId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

//목록조회(localhost:3000/api/music?limit=10)
//-성공 : limit 수 만큼 music 객체를 담은 배열을 리턴(200:OK)
//-실패 : limit가 숫자형이 아닐 경우 400 응답 (400: Bad Request)
const list = (req, res) => {
  let limit = req.query.limit || 10; //있으면 그 값을 넣고 없으면 10 할당 (10은 string 타입)
  limit = parseInt(limit, 10); //10진수로 바꿈

  if (Number.isNaN(limit)) {
    //숫자가 아니면 400 응답
    return res.status(400).end();
  }

  MusicModel.find((err, result) => {
    if (err) return res.status(500).end(); // 서버에러
    //res.json(result);
    res.render("music/list", { result }); //루트가 views이기 때문에 바로 music/list하면돼
  })
    .limit(limit) //limit된 값을 result에 담는거야
    .sort({ created: -1 }); //역순으로 created에 따라 나열
};

//상세조회(localhost:3000/api/music/1)
// - 성공 : id에 해당하는 music 객체 리턴 (200 :ok)
// - 실패 : id가 숫자가 아닐 경우 400응답
//          해당하는 id가 없는 경우 404 응답
const detail = (req, res) => {
  const id = req.params.id;
  MusicModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    //res.json(result);
    res.render("music/detail", { result });
  });
};

//등록(locathost:3000/api/music)
//- 성공 : 입력값으로 music 객체 생성 후 db에 추가 (201 : Created)
//- 실패 : singer, title 값 누락 시 400 응답 (400: Bad Request)
const create = (req, res) => {
  const { singer, title } = req.body; //app.js에서 bodyparser가 설정되어있어서 사용가능
  if (!singer || !title) return res.status(400).end();

  /* //1. Model 을 통해 Documnet 만듦
  const music = new MusicModel({ singer, title });
  music.save((err, result) => {
    if (err) return res.status(500).end();
    res.status(201).json(result);
  });
*/
  //2. Model의 creat함수 사용
  MusicModel.create({ singer, title }, (err, result) => {
    if (err) return res.status(500).send("등록 시 오류가 발생했습니다. ");
    res.status(201).json(result);
  });
};

//수정(locathost:3000/api/music/:id)
// -성공 : id에 해당하는 객체의 정보를 수정 후 반환
// -실패 : 유효한 id가 아닐 경우 400 응답
//         해당하는 id가 없는 경우 404 응답
const update = (req, res) => {
  const { singer, title } = req.body;
  const id = req.params.id;

  //2.업데이트
  MusicModel.findByIdAndUpdate(
    id,
    { singer, title },
    { new: true },
    (err, result) => {
      //new:true -> option값 : 업데이트한 결과를 보내도록
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다.");
      if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
      res.json(result);
    }
  );
};

//삭제(locathost:3000/api/music/:id)
// -성공 : id에 해당하는 music객체 삭제 후 결과 배열 리턴
// -실패 : id가 숫자가 아님
//         해당하지 않는 id

const remove = (req, res) => {
  const id = req.params.id;

  MusicModel.findByIdAndRemove(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    if (!result) return res.status(404).end("해당하는 정보가 없습니다.");
    res.json(result);
  });
};

const showCreatePage = (req, res) => {
  res.render("music/create"); //ejs를 넘겨줌
};

const showUpdatePage = (req, res) => {
  const id = req.params.id;

  MusicModel.findById(id, (err, result) => {
    if (err) return res.status(500).send("조회 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.render("music/update", { result });
  }); //update.ejs에 result를 같이 뿌림
};

//함수만 만든거니까 밖에서(index) 사용할 수 있또록
module.exports = {
  list,
  detail,
  create,
  update,
  remove,
  checkId,
  showCreatePage,
  showUpdatePage,
};
