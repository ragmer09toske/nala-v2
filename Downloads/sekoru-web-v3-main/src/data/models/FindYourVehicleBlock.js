import DataType from 'sequelize';
import Model from '../sequelize';

const FindYourVehicleBlock = Model.define('FindYourVehicleBlock', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataType.STRING
    },

    value: {
        type: DataType.TEXT
    }
});

export default FindYourVehicleBlock; 