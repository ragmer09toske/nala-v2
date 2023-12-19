import DataType from 'sequelize';
import Model from '../../sequelize';

const Privileges = Model.define('Privileges', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  privilege: {
    type: DataType.STRING,
    allowNull: false,
  },

});

export default Privileges;
