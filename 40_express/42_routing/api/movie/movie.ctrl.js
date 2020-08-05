let nextId = 4;
// 데이터
let movie = [
    { id: 1, title: "스타워즈", director: "조지 루카스", year: "1977"},
    { id: 2, title: "아바타", director: "제임스 카메론", year: "2009"},
    { id: 3, title: "인터스텔라", director: "크리스토퍼 놀란", year: "2014"}
];

// 목록조회 (localhost:3000/api/movie?limit=10)
// - 성공 : limit수만큼 movie 객체를 담은 배열을 리턴 (200: OK)
// - 실패 : limit가 숫자형이 아닌 경우 (400)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);

    if (Number.isNaN(limit)) return res.status(400).end();
    
    res.json(movie.slice(0, limit));
};

// 상세조회 (localhost:3000/api/movie/:id)
// - 성공 : id에 해당하는 movie 객체 리턴 (200: OK)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//          해당하는 id가 없는 경우(404 : Not Found)
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if(Number.isNaN(id)) return res.status(400).end();

    // const result = movie.find((m) => m.id === id)[0];
    const result = movie.filter((m) => m.id === id)[0];

    if(!result) return res.status(404).end();

    res.json(result);
};

// 등록
// - 성공 : id는 채번하고, 입력받은 title, director, year로
//          새로운 객체를 만들어서 배열에 추가 (201 : Created)
// - 실패 : title, director, year 값이 없는 경우 (400: Bad Request)
const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!title || !director || !year) return res.status(400).end();

    const m = { id: nextId++, title, director, year};
    movie.push(m);
    res.status(201).json(m);
};

// 수정 (localhost:3000/api/movie/:id)
// - 성공 : id에 해당하는 객체에 입력값으로 업데이트하고 객체 반환 (200: Ok)
// - 실패 : id가 숫자가 아닐 경우 ( 400: Bad Request )
//          해당하는 id가 없는 경우( 404 : Not Found )
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    
    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();

    const { title, director, year } = req.body;
    if(title) result.title = title;
    if (director) result.director = director;
    if (year) result.year = year;
    res.json(result);
};

// 삭제 (localhost:3000/api/movie/:id)
// - 성공 : id에 해당하는 객체를 배열에서 삭제 후 배열 리턴 (200 : Ok)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if(!result) res.status(404).end();

    movie = movie.filter((m) => m.id !== id);
    res.json(movie);
};

module.exports = { list, detail, create, update, remove};