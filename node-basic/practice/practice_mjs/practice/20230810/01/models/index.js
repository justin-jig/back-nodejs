'use strict';

import Sequelize from 'sequelize';
import { development } from '../config/config.js';;
import {user} from './user.models.js';

const Config = development;
const db = {};

const sequelize = new Sequelize(Config.database, Config.username, Config.password, Config);
db.User = user(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
