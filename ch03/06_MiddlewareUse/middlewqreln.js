const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 로그 미들웨어
const logMiddleware = (req, res, next) => {
   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
   next() // 다음 미들웨어로 이동
}

// 인증 미들웨어
const authMiddleware = (req, res, next) => {
   const token = '12345'
   if (token === '12345') {
      console.log('인증성공!')
      next() // 인증 성공 시 다음 미들웨어로 이동
   }
}

// 조건부 실행 미들웨어(1번으로 수행되는 미들웨어)
app.use((req, res, next) => {
   if (req.path === '/secure') {
      // '/secure' 경로에만 인증 미들웨어 실행
      authMiddleware(req, res, next)
   } else {
      next() // 인증 미들웨어를 건너뛰고 다음으로 이동
   }
})

app.use(logMiddleware)

app.get('/', (req, res) => {
   res.send('환영합니다!')
})

app.get('/secure', (req, res) => {
   res.send('당신은 secure route에 접근했습니다!')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
