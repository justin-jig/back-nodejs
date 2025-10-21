
//visitor에 대하 테이블 정의
const Visitor = function (sequelize, DataTypes) {
    // sequelize는 models/index.js에 있는 소문자 sequelize
    // DataTypes는 models/index.js에 있는 대문자 Sequelize
    const model = sequelize.define('visitor', {
        id : {
            type: DataTypes.INTEGER,
            allowNumll: false,
            primaryKey : true,
            autoIncrement: true
        },
        name : {
            type:DataTypes.STRING(10),
            allowNumll: false
        },
        comment : {
            type: DataTypes.TEXT('medium')
        },
    },{
        tableName : 'visitor',
        freezeTableName: true,
        timestamps:false
    });
    return model
};

module.exports = Visitor;