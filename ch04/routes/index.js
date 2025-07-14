const express = require('express')
const User = require('../models/user')

const router = express.Router()

// localhost:8000/
router.get('/', async (req, res, next) => {
   try {
      // select * from users
      const users = await User.findAll()
      console.log('users: ', users)

      // 200: 성공
      // users를 json 형태로 response
      res.status(200).json(users)
   } catch (error) {
      console.error(error)
      next(error) // app.js의 에러처리 미들웨어로 이동
   }
})

module.exports = router
