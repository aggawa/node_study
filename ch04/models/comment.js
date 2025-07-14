const Sequelize = require('sequelize')

// class명은 파일명과 동일하게 작성하되 대문자로 시작
module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            comment: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            create_at: {
               type: Sequelize.DATE,
               allowNull: true,
               defaultValue: Sequelize.NOW,
            },
         },
         {
            sequelize,
            timestamps: false, // createAt, updateAt 컬럼 자동 생성 여부 -> false 생성하지 않음
            underscored: false, // 컬럼 이름을 카멜케이스로 유지할건지 여부 -> false 유지하지 않음
            modelName: 'Comment', // 시퀄라이즈에서 사용하는 모델이름 (클래스명)
            tableName: 'comments', // 데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부 (deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      // Comment는 User에 속해있다 (User가 부모 테이블, Comment는 자식테이블이다.)
      db.Comment.belongsTo(db.User, {
         foreignKey: 'commenter', // Comments 테이블에서 사용할 외래키 컬럼 이름
         targetKey: 'id', // commenter가 users 테이블에서 참조하는 컬럼 이름 (users 테이블의 PK)
      })
   }
}
