const { odd, even } = require('./ment')
// require 함수안에 불러올 모듈의 경로

// 짝홀수 판단
function checkOddOrEven(num) {
   if (num % 2 === 0) {
      return even
   } else {
      return odd
   }
}

// 함수를 내보냄
module.exports = checkOddOrEven
