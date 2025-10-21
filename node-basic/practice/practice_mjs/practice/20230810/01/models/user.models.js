

export const user = (sequelize, DataTypes) => {

    const model = sequelize.define('user2', {

        id : {
            type: DataTypes.INTEGER,
            allowNumll: false,
            primaryKey : true,
            autoIncrement: true
        },

        userid : {
            type:DataTypes.STRING(20),
            allowNumll: false
        },
        pw : {
            type:DataTypes.STRING(20),
            allowNumll: false
        },
        name : {
            type:DataTypes.STRING(10),
            allowNumll: false
        },
    }, {
        tablename : 'user2',
        freezeTableName: true,
        timestamps:false

    });
    return model
}

