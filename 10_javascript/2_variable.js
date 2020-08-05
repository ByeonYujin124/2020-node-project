var a = 1;                // 변수 선언
var b = 2;                    
console.log("a:" + a);    // 콘솔 출력
console.log("b:%d", b);

var s1 = "Hello";
var s2 = "World!";

console.log("s1:" + s1);
console.log("s2:%s", s2);
console.log(s1 + s2);

console.log(typeof 1);       // number
console.log(typeof a);

console.log(typeof "Hello"); // string
console.log(typeof s1);

console.log(typeof true);    // boolean
console.log(typeof c);       // undefined

console.log(typeof {});      // object

function foo() {
    if (true) {
        let tmp = 0;		// var를 let으로 변경
        console.log("1:" + tmp);
    }
    console.log("2:" + tmp);
}

let v1 = 1;
const v2 = 2;

v1++;
v2++;