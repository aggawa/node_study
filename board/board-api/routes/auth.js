const express = require('express')
// const passport = require('passport')
const bcrypt = require('bcrypt') // 암호화
const router = express.Router()
const Member = require('../models/member')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

// ↓ 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   try {
      const { email, name, password } = req.body

      const exMember = await Member.findOne({
         where: { email }, // 등록된 계정 확인
      })

      if (exMember) {
         const error = new Error('이미 존재하는 사용자입니다.')
         error.status = 409
         return next(error) // 에러 미들웨어로
      }

      const hash = await bcrypt.hash(password, 12)

      const newMember = await Member.create({
         email,
         name,
         password: hash,
      })

      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         member: {
            email: newMember.email,
            name: newMember.name,
         },
      })
   } catch (error) {
      error.status = 500
      error.message = '회원가입 중 오류가 발생했습니다.'
      next(error)
   }
})

// ↓ 로그인

// ↓ 로그아웃

// ↓ 현재 로그인 상태
