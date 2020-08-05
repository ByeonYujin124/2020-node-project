const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //필수적으로 입력해야함
    trim: true, //앞뒤 스페이스 제거
    maxlength: 50,
  },
  email: {
    type: String,
    requierd: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: Number,
    default: 0, //0: 일반 사용자 1:관리자
  },
  token: {
    type: String,
  },
});

//모델명s 이름의 컬렉션이 만들어짐, 세번째 인자로 모델의 이름을 명시적으로 정할 수 있음
module.exports = mongoose.model("user", UserSchema);
