const Sequelize = require('sequelize')

// class명은 파일명과 동일하게 작성하되 대문자로 시작
module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            // name 컬럼 정의
            name: {
               type: Sequelize.STRING(20), // VARCHAR2(20)
               allowNull: false, // null 제약조건 -> not null
               unique: true, // unique 제약조건 -> 중복허용 X
            },
            // age 컬럼 정의
            age: {
               type: Sequelize.INTEGER.UNSIGNED, // 양수만 가능한 정수 int
               allowNull: false, // null 제약조건 -> not null
            },
            // married 컬럼 정의
            married: {
               type: Sequelize.BOOLEAN, // true, false값이 저장되는 타입 tinyint
               allowNull: false, // null 제약조건 -> not null
            },
            // comment 컬럼 정의
            comment: {
               type: Sequelize.TEXT, // TEXT
               allowNull: false, // null 제약조건 -> not null
            },
            // create_at 컬럼 정의
            create_at: {
               type: Sequelize.DATE, // DATE
               allowNull: false, // null 제약조건 -> not null
               defaultValue: Sequelize.NOW, // 디폴트 값으로 현재 시간 설정 (sysdate)
            },
         },
         {
            sequelize,
            timestamps: false, // createAt, updateAt 컬럼 자동 생성 여부 -> false 생성하지 않음
            underscored: false, // 컬럼 이름을 카멜케이스로 유지할건지 여부 -> false 유지하지 않음
            modelName: 'User', // 시퀄라이즈에서 사용하는 모델이름 (클래스명)
            tableName: 'Users', // 데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부 (deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      // User : Commnet = 1 : n
      // User가 Comment를 가지고 있다 (User 부모테이블, Comment 자식테이블)
      db.User.hasMany(db.Comment, {
         foreignKey: 'commenter', // comments 테이블에서 사용할 외래키 컬럼 이름
         sourceKey: 'id', // user테이블에서 comments 테이블에게 외래키로 제공할 컬럼 이름
      })
   }
}
