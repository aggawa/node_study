const Sequelize = require('sequelize')

module.exports = class Hashtag extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(15),
               allowNull: false,
               unique: true,
            },
         },
         {
            sequelize,
            timestamps: true, // createAt, updateAt 컬럼 자동 생성 여부 -> false 생성하지 않음
            underscored: false, // 컬럼 이름을 카멜케이스로 유지할건지 여부 -> false 유지하지 않음
            modelName: 'Hashtag', // 시퀄라이즈에서 사용하는 모델이름 (클래스명)
            tableName: 'hashtags', // 데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부 (deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할때 collate과 똑같이 사용
         }
      )
   }
   static associate(db) {
      // n : n 관계 정의
      // through: 교차테이블명
      db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' })
   }
}
