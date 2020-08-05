let nextId = 4;
// 데이터
let music = [
    { id: 1, singer: "준호", title: "Wow"},
    { id: 2, singer: "지코", title: "아무노래"},
    { id: 3, singer: "악뮤", title: "크레센도"}
];

// 목록조회 (localhost:3000/api/music?limit=10)
// - 성공 : limit수만큼 music 객체를 담은 배열을 리턴 (200: OK)
// - 실패 : limit가 숫자형이 아닌 경우 (400)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);

    if (Number.isNaN(limit)) return res.status(400).end();
    
    res.json(music.slice(0, limit));
};

// 상세조회 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체 리턴 (200: OK)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//          해당하는 id가 없는 경우(404 : Not Found)
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if(Number.isNaN(id)) return res.status(400).end();

    // const result = music.find((m) => m.id === id)[0];
    const result = music.filter((m) => m.id === id)[0];

    if(!result) return res.status(404).end();

    res.json(result);
};

// 등록
// - 성공 : id는 채번하고, 입력받은 singer, title로
//          새로운 객체를 만들어서 배열에 추가 (201 : Created)
// - 실패 : singer, title 값이 없는 경우 (400: Bad Request)
const create = (req, res) => {
    const { singer, title } = req.body;
    if (!singer || !title) return res.status(400).end();

    const m = { id: nextId++, singer, title};
    music.push(m);
    res.status(201).json(m);
};

// 수정 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체에 입력값으로 업데이트하고 객체 반환 (200: Ok)
// - 실패 : id가 숫자가 아닐 경우 ( 400: Bad Request )
//          해당하는 id가 없는 경우( 404 : Not Found)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    
    const result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();

    const {singer, title} = req.body;
    if(singer) result.singer = singer;
    if (title) result.title = title;
    res.json(result);
};

// 삭제 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체를 배열에서 삭제 후 배열 리턴 (200 : Ok)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if(!result) res.status(404).end();

    music = music.filter((m) => m.id !== id);
    res.json(music);
};

module.exports = { list, detail, create, update, remove};