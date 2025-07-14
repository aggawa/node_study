// 단방향 암호화: 복호화 할 수 없음
const crypto = require('crypto')

// crypto.createHash(알고리즘 종류).update(암호화 하고싶은 값).digest(인코딩 방식)
console.log(crypto.createHash('sha512').update('password111').digest('base64'))
console.log('')
console.log(crypto.createHash('sha512').update('password111').digest('hex'))
console.log('')
console.log(crypto.createHash('sha512').update('password222').digest('base64'))
