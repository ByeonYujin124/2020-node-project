var arr = [1, 2, 3, 4, 5];

console.log(arr.length);    // 5
console.log(arr[2]);        // 3

var arr2 = [1, 2, 'apple', 'banana'];

console.log(arr2[2]);       // apple

// 일반 for문
for (i = 0; i < arr2.length; i++) {
    console.log(i + ":" + arr2[i]);
  }
  
  // for-in문
  for (i in arr2) {
    console.log(i + ":" + arr2[i]);  // i는 인덱스
  }
  
  // for-of문 (ES6에 추가)
  for (i of arr2) {
    console.log(i);
  }

  var a = ["a", "b", "c"];
a.push("d");
console.log(a);        // [ 'a', 'b', 'c', 'd' ]

console.log(a.pop());  // d
console.log(a);        // [ 'a', 'b', 'c' ]

var a = ["a", "b", "c"];
a.splice(1, 0, "d");
console.log(a);    //['a', 'd', 'b', 'c']

a = ["a", "b", "c"];
a.splice(1, 1, "x", "y");
console.log(a);    //['a', 'x', 'y', 'c']

a = [1, 2, 3, 4, 5];
a.splice(2);       //index2부터 전부다 삭제
console.log(a);    //[1, 2]

const b = [1,2,3,4,5];
const result = b.find((item) => item >= 3); // 3
console.log(result);

const result2 = b.filter((item) => item >= 3); // [ 3, 4, 5 ]
console.log(result2);

const result3 = b.map(item => item * 2);
console.log(result3);