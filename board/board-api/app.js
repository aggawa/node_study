const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
require('dotenv').config()
const cors = require('cors')

// 모듈 불러오기
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const memberRouter = require('./routes/member')
const boardRouter = require('./routes/board')
const pageRouter = require('./routes/page')
const { sequelize } = require('./models')
const passportConfig = require('./passport')

const app = express()
passportConfig()
app.set('port', process.env.PORT || 8002)

// DB연결
sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err)
   })

// 미들웨어 설정
app.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true,
   })
)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
   session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.COOKIE_SECRET,
      cookie: {
         httpOnly: true,
         secure: false,
      },
   })
)

app.use(passport.initialize())
app.use(passport.session())

// 라우터 등록
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/my', memberRouter) // 회원정보 라우트
app.use('/board', boardRouter)
app.use('/page', pageRouter)

// 잘못된 라우터 경로 처리
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404
   next(error)
})

// 에러 미들웨어
app.use((err, req, res, next) => {
   console.error(err)

   const statusCode = err.status || 500
   const errorMessage = err.message || '서버 내부 오류'

   res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: err,
   })
})

app.listen(app.get('port'), () => {
   console.log(`${app.get('port')}번 포트에서 대기중`)
})
