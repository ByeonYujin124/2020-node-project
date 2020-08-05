const express =  require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
const port = 3000;

app.listen(3000, function() {
    console.log(`Server running at http://localhost:${port}`);
});

app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.use(express.static("public"));

app.use(logger("common")); //tiny<dev<short<common<combine

app.get("/", (req, res) => res.send("Hello World!!"));

app.get("/music", (req,res) => {
    console.log(req);
    const{singer, title} = req.query;
    res.send(
        `query string(get) -> ${singer}의 ${title}입니다.`
    )
})

app.get("/music/:singer/:title", (req,res) => {
    const{singer, title} = req.params;
    res.send(
        `url parameter(get) -> ${singer}의 ${title}입니다.`
    )
})

app.post("/music", (req,res) => {
    const { singer, title} = req.body;
    res.send(`urlencded(post) -> ${singer}의 ${title}입니다.`);
})

app.put("/music/:id", (req,res) => {
    const id = req.params.id;
    const { singer, title } = req.body;
    // {id} -> 아이유의 블루밍으로 수정됨
    req.send(`${id} -> ${singer}의 ${title}로 수정됨`);
})

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