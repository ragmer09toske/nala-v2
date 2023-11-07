import Sequelize from 'sequelize';
import { databaseUrl } from '../config';

const sequelize = new Sequelize(databaseUrl, {
  define: {
    freezeTableName: true
  },
  dialectOptions: {
    charset: 'utf8mb4'
  },
  logging: console.log
});

export default sequelize;
