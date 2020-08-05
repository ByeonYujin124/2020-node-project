const express =  require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`);
});

// 로깅 미들웨어 설정
app.use(logger("dev")); //tiny < dev < short < common < combine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 라우팅 모듈 설정
// /api/xxx
app.use("/api", require("./api"));

// 여기까지 내려왔다는 것은 위에서 처리가 되지 않음
app.use((req, res, next) => {
    const error = new Error("없는 페이지입니다.");
    error.code = 404;
    next(error);
    // throw new Error();
});

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
    // if (err.code) res.status(err.code);
    // else res.status(500); // Internal Server Error
    res.status(err.code || 500);
    // if (err.message) res.send(err.message);
    // else res.send("Internal Server Error");
    res.send(err.message || "Inernal Server Error");
});

// REST API
// 1. HTTP 요청 시 자원을 명시(명사)
// ex) GET /users, GET /users/1
// test.com/users : GET, users/1 : GET (조회)
// test.com/users : POST (생성)
// test.com/users : PUT (수정)
// test.com/users : DELETE (삭제)
// (bad case)
// test.com/users/search
// test.com/users/create
// test.com/users/update
// test.com/users/delete