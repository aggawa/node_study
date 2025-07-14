const Sequelize = require('sequelize')

module.exports = class Member extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            name: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            password: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            createdAt: {
               type: Sequelize.DATE,
               allowNull: false,
            },
            updatedAt: {
               type: Sequelize.DATE,
               allowNull: false,
            },
            deletedAt: {
               type: Sequelize.DATE,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt 자동 생성
            underscored: false,
            modelName: 'Member',
            tableName: 'members',
            paranoid: true, // deleteAt 자동생성, 소프트 삭제
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Member.hasMany(db.Board, {
         foreignKey: 'memberId',
         sourceKey: 'id',
      })
   }
}
