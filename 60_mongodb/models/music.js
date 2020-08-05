const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
  singer: {
    type: String,
    required: true, //필수적으로 입력해야함
    trim: true, //앞뒤 스페이스 제거
  },
  title: {
    type: String,
    requierd: true,
    trim: true,
  },
  created: {
    //언제 데이터 생성했는지
    type: Date,
    default: Date.now, //데이터가 들어오지 않으면 현재 시간을 dafault값으로 넣음
  },
});

//모델명s 이름의 컬렉션이 만들어짐, 세번째 인자로 모델의 이름을 명시적으로 정할 수 있음
module.exports = mongoose.model("music", MusicSchema);
