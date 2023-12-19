import DataType from 'sequelize';
import Model from '../sequelize';

const WhyHost = Model.define('WhyHost', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    imageName: {
        type: DataType.STRING,
    },

    title: {
        type: DataType.STRING,
    },

    buttonLabel: {
        type: DataType.STRING,
    },

});

export default WhyHost;