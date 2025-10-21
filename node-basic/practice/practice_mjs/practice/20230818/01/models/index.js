
import Sequelize from 'sequelize';
import Config from '../config/config.js';
import UserModel from './user.models.js';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = UserModel(sequelize, Sequelize);


export default db;
