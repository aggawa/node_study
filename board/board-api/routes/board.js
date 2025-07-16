const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Board, Member } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

try {
   fs.readdirSync('uploads')
} catch (error) {
   console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cd) {
         cd(null, 'uploads/')
      },
      filename(req, file, cd) {
         const decodeFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodeFileName)
         const basename = path.basename(decodeFileName, ext)
         cd(null, basename + Date.now() + ext)
      },
   }),
   limits: { fieldSize: 7 * 1024 * 1024 },
})

router.post('/', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      // 업로드 된 파일이 없을시
      if (!req.file) {
         const error = new Error('파일 업로드에 실패했습니다.')
         error.status = 400
         return next(error)
      }

      // 게시물 등록
      const board = await Board.create({
         // db에 title 만들기 -> 입력하는곳도 만들어야하고 그럼
         // 여기 다 db 컬럼명 / 거따 데이터 넣는곳
         title: req.body.title,
         content: req.body.content,
         img: `/${req.file.filename}`,
         memberId: req.user.id,
      })
      res.status(200).json({
         success: true,
         board: {
            id: board.id,
            // 여기도 타이틀을 만들어줘야겠죠 아마
            title: board.title,
            content: board.content,
            img: board.img,
            memberId: board.memberId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 등록 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
