import DataType from 'sequelize';
import Model from '../sequelize';

const StaticInfoBlock = Model.define('StaticInfoBlock', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataType.STRING
    },

    name: {
        type: DataType.STRING
    },

    value: {
        type: DataType.TEXT
    }

    
});

export default StaticInfoBlock;