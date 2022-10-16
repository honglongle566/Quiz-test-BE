const { Sequelize ,DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var examination_room = sequelize.define(
        'examination_room',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(4)
            },
            user_id: {
                type: Sequelize.INTEGER(4)
            },
            name: {
                type: Sequelize.STRING(255)
            },
            created_date: {
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW
            },
            created_by: {
                type: Sequelize.STRING(255)
            },
            updated_date: {
                type: Sequelize.DATE
            },
            updated_by:{
                type: Sequelize.STRING(255)
            }
        },{
            timestamps: false,
        }
    );
    return examination_room;
}