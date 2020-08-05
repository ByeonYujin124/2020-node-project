// 첫번째 방식
function add(a, b) {
    return a + b;
}

console.log(add(2, 3));

// 두번째 방식
var add = function(a, b) {
    return a + b;
};

console.log(add(2, 3));

// 세번째 방식
var result = (function(a, b) {
    return a + b;
  })(2, 3);
  
  console.log(result);

// 네번째 방식
var result = ((a, b) => {
    return a + b;
  })(2, 3);

  foo();

function foo() {
    console.log('출력');
}