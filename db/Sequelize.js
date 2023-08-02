import Sequelize from 'sequelize';
import UserModel from './models/User.js';
import { userFill } from './fillers/UserFiller.js';
import RaspberryModel from './models/raspberry.js';
import { raspberryFIll } from './fillers/RaspberryFiller.js';
import StatsModel from './models/stats.js';

const sequelize = new Sequelize('gilres', 'root', '1', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

export const User = UserModel(sequelize);
export const Raspberry = RaspberryModel(sequelize);
export const Stats = StatsModel(sequelize);

// relations
User.hasOne(Raspberry)
Raspberry.belongsTo(User)

User.hasMany(Stats)
Stats.belongsTo(User)

export const dbInit = () => {
  return sequelize.sync({ force: true }).then(() => {
    userFill();
    raspberryFIll()
  });
};
