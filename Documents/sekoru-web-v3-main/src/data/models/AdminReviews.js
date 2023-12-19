import DataType from 'sequelize';
import Model from '../sequelize';

const AdminReviews = Model.define('AdminReviews', {

  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  userName: {
    type: DataType.STRING,
  },

  reviewContent: {
    type: DataType.TEXT,
  },

  image: {
    type: DataType.STRING,
  },

  isEnable: {
    type: DataType.BOOLEAN,
    defaultValue: 1,
  },

});

export default AdminReviews;  