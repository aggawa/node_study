const a = true

// if (a) {
//     import './func.mjs'
// }

// console.log('성공')

if (a) {
   await import('./func.mjs')
}

console.log('성공')

// ES모듈을 특정 조건절에서 사용가능
