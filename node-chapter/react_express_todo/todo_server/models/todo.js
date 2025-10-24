

const Todo = function (sequelize, DataTypes) {

    const model = sequelize.define('todo', {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement : true,
            primaryKey: true
        },
        title : {
            type:DataTypes.STRING(1000),
            allowNumll: false
        },
        done : {
            type: DataTypes.BOOLEAN
        },
    },{
        tableName : 'todo',
        freezeTableName: true,
        timestamps:false,
        charset :'utf8',
        collate: 'utf8_general_ci'
    });
    return model
};


module.exports = Todo;