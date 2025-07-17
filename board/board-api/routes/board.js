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
         title: req.body.title,
         content: req.body.content,
         img: `/${req.file.filename}`,
         memberId: req.user.id,
      })
      res.status(200).json({
         success: true,
         board: {
            id: board.id,
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

// 게시물 수정
// localhost:8000/board/:id
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      const board = await Board.findOne({
         // 여기
         where: { id: req.params.id, memberId: req.user.id },
      })

      if (!board) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }

      await board.update({
         title: req.body.title,
         content: req.body.content,
         img: req.file ? `/${req.file.filename}` : board.img,
      })

      const updatedBoard = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Member,
               attributes: ['id', 'name'],
            },
         ],
      })

      res.status(200).json({
         success: true,
         board: updatedBoard, // ??????
         message: '게시물이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 수정 중 오류가 발생했습니다.'
      next(error)
   }
})

// 게시물 삭제 localhost:8000/board/:id
router.delete('/:id', isLoggedIn, async (req, res, next) => {
   try {
      const board = await Board.findOne({
         // 여기
         where: { id: req.params.id, memberId: req.user.id },
      })

      if (!board) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }

      await board.destroy() // 삭제

      res.status(200).json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 삭제 중 오류가 발생했습니다.'
      next(error)
   }
})

// 게시물 페이징
router.get('/', async (req, res, next) => {
   try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 3
      const offset = (page - 1) * limit
      const count = await Board.count()

      const boards = await Board.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: Member,
               attributes: ['id', 'name', 'email'],
            },
         ],
      })

      console.log('board: ', boards)

      res.status(200).json({
         success: true,
         boards,
         pagination: {
            totalBoards: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '전체 게시물 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 리스트를 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

// 특정 게시물
router.get('/:id', async (req, res, next) => {
   try {
      const board = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Member,
               attributes: ['id', 'name', 'email'],
            },
         ],
      })
      if (!board) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }
      res.status(200).json({
         success: true,
         board,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '특정 게시물을 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
