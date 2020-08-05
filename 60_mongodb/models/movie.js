const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //필수적으로 입력해야함
    trim: true, //앞뒤 스페이스 제거
  },
  director: {
    type: String,
    requierd: true,
    trim: true,
  },
  year: {
    //영화 개봉
    required: true,
    type: String,
  },
});

//모델명s 이름의 컬렉션이 만들어짐, 세번째 인자로 모델의 이름을 명시적으로 정할 수 있음
module.exports = mongoose.model("movie", MovieSchema);
