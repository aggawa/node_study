const passport = require('passport')
const local = require('./localStrategy')
const Member = require('../models/member')

module.exports = () => {
   passport.serializeUser((member, done) => {
      console.log('member: ', member)
      done(null, member.id)
   })

   passport.deserializeUser((id, done) => {
      Member.findOne({
         where: { id },
         attributes: ['id', 'email', 'name', 'createdAt', 'updatedAt', 'deletedAt'],
      })
         .then((member) => done(null, member))
         .catch((err) => done(err))
   })
   local()
}
