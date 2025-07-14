const express = require('express')
const User = require('../models/user')
const Comment = require('../models/comment')
const router = express.Router()

// localhost:8000/users
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

// 원하는 특정 데이터 가져오기
// localhost:8000/users/:id
router.get('/:id', async (req, res, next) => {
   try {
      // select * from user where id = :id
      const user = await User.findAll({
         where: { id: req.params.id },
      })
      console.log(user)
      res.status(200).json(user)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

// 특정 사용자가 작성한 모든 댓글 가져오기
// localhost:8000/users/:id/comments
router.get('/:id/comments', async (req, res, next) => {
   /* 
   select *
   from comments
   join users
   on comments.commenter = users.id
   where users.id = :id;
   */
   try {
      // comments 테이블 데이터를 가져올때 특정 id를 가진 users 테이블 데이터를 포함해서 가져온다
      // const comments = await Comment.findAll({
      //    attributes: ['comment', 'create_at'],
      //    // comments 테이블의 특정컬럼만
      //    include: {
      //       // include 안에 있는건 User에 대한것만 작성
      //       model: User,
      //       where: { id: req.params.id },
      //       attributes: ['name', 'age'], // users 테이블의 특정 컬럼만 가져온다.
      //    },
      //    // include: {
      //    //    model: User,
      //    //    where: {id: req.params.id},
      //    // },
      // })

      const comments = await User.findAll({
         where: { id: req.params.id }, // users 테이블에서 쓰이는 where절
         attributes: ['name', 'age'], // name, age 컬럼만 가져옴
         include: {
            model: Comment, // 컬럼을 가져오는곳
            attributes: ['comment', 'create_at'], // comment, create_at 컬럼만 가져옴
         },
      })

      console.log(comments)
      res.status(200).json(comments)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

// 특정 사용자 등록 (insert)
// localhost:8000/users
router.post('/', async (req, res, next) => {
   try {
      console.log(req.body)

      const user = await User.create({
         name: req.body.name, // 클라이언트 받은 값들을 컬럼값으로 지정
         age: req.body.age,
         married: req.body.married,
         comment: req.body.comment,
      })
      console.log(user) // 생성된 사용자 데이터 출력
      res.status(201).json(user) // create 성공시에는 상태코드 201, 생성된 사용자 데이터 response
   } catch (error) {
      console.error(error)
      next(error)
   }
})

module.exports = router
