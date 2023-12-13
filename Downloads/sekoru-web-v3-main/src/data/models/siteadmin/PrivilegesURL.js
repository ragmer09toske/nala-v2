import DataType from 'sequelize';
import Model from '../../sequelize';

const PrivilegesURL = Model.define('PrivilegesURL', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  privilegeId: {
    type: DataType.INTEGER,
    allowNull: false,
  },

  permittedUrls: {
    type: DataType.STRING,
    allowNull: false,
  },

});

export default PrivilegesURL;
