const express = require('express')
const { Member, Board } = require('../models')
const router = express.Router()

router.get('/my/:id', async (req, res, next) => {
   try {
      // select  where id
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
         const error = new Error('사용자를 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }
      res.status(200).json({
         success: true,
         board,
         message: '사용자 정보를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '회원 정보를 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
   console.log(res)
})

module.exports = router
