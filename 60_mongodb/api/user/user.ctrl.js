const UserModel = require("../../models/user");
const bcrypt = require("bcrypt"); //암호화 위해
const jwt = require("jsonwebtoken"); //로그인 할 때 토큰을 발급해 유지하기 위한 용도
const user = require("../../models/user");

const showSignupPage = (req, res) => {
  res.render("user/signup"); //user밑의 signup.ejs보여주도록 함
};

//회원가입
//-성공 : 201(Created)응답, 생성된 user객체 반환
//-실패 : 필수 입력값 누락 (400: Bad Request)
//        이메일 중복된 경우(409:conflict)
const signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send("필수값이 입력되지 않았습니다.");

  UserModel.findOne({ email }, (err, result) => {
    if (err) return res.status(500).send("회원가입 시 오류가 발생했습니다.");
    if (result) return res.status(409).send("이미 사용중인 E-mail입니다"); //이메일 중복되는지 체크

    //이메일 중복 없으면 회원가입
    //bcrypt: 단방향 해시함수, 암호화만 시킴
    const saltRounds = 10; //salt자릿수, 몇자리 만들건지
    bcrypt.hash(password, saltRounds, (err, hash) => {
      //암호화
      if (err) return res.status(500).send("암호화 시 오류가 발생했습니다");

      const user = new UserModel({ name, email, password: hash }); //암호화된 비번 넣어서 새로운 user만들어야지, name : name, email: email
      user.save((err, result) => {
        if (err) return res.status(500).send("회원가입 시 오류가 발생했습니다");

        res.status(201).json(result);
      });
    });
  });
};

const showLoginPage = (req, res) => {
  res.render("user/login");
};

//로그인
//성공 : email password가 일치하면 성공(200)
//실패 : 필수 입력값이 미입력된 경우 (400 :Bad Request)
//       가입되지 않은 이메일일 경우  (404 : notfound)
//       password가 일치하지 않는 경우 (500)
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("필수값이 입력되지 않았습니다.");

  UserModel.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send("사용자 조회 시 오류가 발생했습니다.");
    if (!user) return res.status(409).send("가입되지 않은 계정입니다");

    bcrypt.compare(password, user.password, (err, isMatch) => {
      //화면에서 입력받은 password와 암호화시킨 user.password 비교
      if (err)
        return res.status(500).send("암호화 처리 시 오류가 발생했습니다");
      if (!isMatch) return res.status(500).send("비밀번호가 올바르지 않습니다");

      //비밀번호 검증 성공 => signed 토큰 발급 (jsonwebtoken)
      const token = jwt.sign(user._id.toHexString(), "secretKey"); //user_id가 들어간 토큰 발급해 저장
      UserModel.findByIdAndUpdate(user._id, { token }, (err, result) => {
        if (err) return res.status(500).send("로그인 시 오류가 발생했습니다");
        //토큰 저장 : cookie, locat storage ..
        //클라이언트에 토큰 정보 내려줌 -> cookie에다가 발급받은 토큰 정보 넣음
        res.cookie("token", token, { httpOnly: true }); //name:token valud:token
        res.json(result);
      });
    });
  });
};

// 인증처리 (유효한 토큰인지 검사) 올바르지 않은 토큰이면 로그인 다시 하라고 함
const checkAuth = (req, res, next) => {
  //모든 화면에서 공통으로 필요로 하는 데이터가 있을 때
  res.locals.user = null; //모든 화면에서 user.으로 사용가능

  //쿠키에서 토큰 꺼내와서 올바른지 확인해야지
  const token = req.cookies.token; //쿠키의 token이름을 가진 것에서 정보를 꺼내옴

  if (!token) {
    //토큰이 없는게 정상적인 경우 - 로그인 하기 전 main,login페이지 등등
    if (
      req.url === "/" ||
      req.url === "/api/user/signup" ||
      req.url === "/api/user/login"
    )
      return next();
    // 토큰이 없지만 정상인 거니까 next로 그냥 흘려보내줌
    else return res.render("user/login"); //토큰이 없으면 다시 로그인 페이지로 보여줌
  }

  //토큰이 있다면 발급한 토큰이 맞는지 검증
  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) {
      res.clearCoolie("token");
      return res.render("user/login");
    }
    UserModel.findOne({ _id, token }, (err, result) => {
      if (err) return res.status(500).send("인증 시 오류가 발생했습니다");
      if (!user) return res.render("user/login");
      res.locals.user = { name: user.name, role: user.role };
      next();
    });
  });
};

//logout
const logout = (req, res) => {
  //쿠키에서 토큰을 가져옴
  const token = req.cookies.token;
  if (!token) return res.render("user/login");

  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다");
    UserModel.findByIdAndUpdate(
      _id,
      { token: "" }, //DB에서 token을 ""으로 업데이트 -> 초기화
      (err, result) => {
        if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다");
        res.clearCookie("token");
        res.redirect("/"); //main으로 이동
      }
    );
  });
};

module.exports = {
  showSignupPage,
  signup,
  showLoginPage,
  login,
  checkAuth,
  logout,
};
