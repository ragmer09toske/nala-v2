import DataType from 'sequelize';
import Model from '../sequelize';

const ImageBanner = Model.define('ImageBanner', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataType.STRING,
        allowNull: false
    },

    description: {
        type: DataType.STRING,
        allowNull: false
    },

    buttonLabel: {
        type: DataType.STRING,
        allowNull: false
    },

    image: {
        type: DataType.STRING,
    },

    buttonLabel2: {
        type: DataType.STRING,
        allowNull: false
    },

    buttonLink1: {
        type: DataType.STRING,
        allowNull: false
    },

    buttonLink2: {
        type: DataType.STRING,
        allowNull: false
    },
});

export default ImageBanner;