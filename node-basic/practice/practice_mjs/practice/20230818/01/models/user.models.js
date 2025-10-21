

export const UserModel = (sequelize, DataTypes) => {

    const model = sequelize.define('user', {

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
            type:DataTypes.STRING(300),
            allowNumll: false
        },
        name : {
            type:DataTypes.STRING(10),
            allowNumll: false
        },
        salt : {
            type:DataTypes.STRING(300),
            allowNumll: false
        }
    });
    return model
}

export default UserModel

