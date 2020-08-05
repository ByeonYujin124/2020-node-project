function add(a, b, callback) {
    var sum = a + b;
    callback(sum);
}
  
function print(result) {  // 콜백 함수로 사용할 함수 정의
   console.log(result);
}                         
  
add(1, 2, print);

// 익명함수로 전달
add(2, 3, function(result) {
    console.log(result);         
});

// 콜백함수 사용 X
function add(a, b) { 
    var sum = a + b;
    return sum;
  }  
  
  function print(result) {
    console.log(result);
  }
  
  print(add(1,2));
  // 이후 로직 처리

  