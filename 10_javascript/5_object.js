var a = {}; // 빈객체
var b = new Object();

// 첫번째 방식 : 객체 생성 후 속성 추가
var Person = {};
Person.age = 18;
Person['name'] = '홍길동';

console.log(Person['age']);  // 18
console.log(Person.name);    // 홍길동

// 두번째 방식 : 객체 생성 시 속성 정의
var Person2 = {
  age: 19,
  name: '홍길서'
};

console.log(Person2['age']);  // 19
console.log(Person2.name);    // 홍길서

// 메소드 생성 방식 1
var Person = {
    age: 18,
    name: "홍길동"
  };
  
  Person.add = function() {
    this.age++;
  };
  
  Person.add();
  console.log(Person.age); // 19

// 메소드 생성 방식 2
  var Person2 = {
    age: 19,
    name: '홍길순',
    add: function() {
        this.age++;
    }
};

Person2.add();
console.log(Person2.age);  // 20

var Users = [
    {
        name: '홍길동',
        age: 18
    },
    {
        name: '홍길서',
        age: 19
    }
];

Users.push({ name: '홍길남', age: 20 });

console.log(Users.length);  // 3
console.log(Users[0]);
// 홍길동 출력해보기
console.log(Users[0].name);