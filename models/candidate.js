const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var candidate = sequelize.define('candidate', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER(4)
        },
        exam_id: {
            type: Sequelize.INTEGER(4)
        },
        examination_room_id: {
            type: Sequelize.INTEGER(4)
        },
        full_name: {
            type: Sequelize.STRING(255)
        },
        phone: {
            type: Sequelize.STRING(15)
        },
        email: {
            type: Sequelize.STRING(255)
        },
        group: {
            type: Sequelize.STRING(255)
        },
        identify_code: {
            type: Sequelize.STRING(255)
        },
        token: {
            type: Sequelize.STRING(255),
        },
        score: {
            type: Sequelize.INTEGER(2)
        },
        complete_percent: {
            type: Sequelize.INTEGER(3)
        },
        status: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0
        },
        deleted: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0,
        },
        created_date: {
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW
        },
        created_by: {
            type: Sequelize.STRING(255)
        },
        updated_date: {
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_by: {
            type: Sequelize.STRING(255)
        }
    }, {
        timestamps: false
    });
    return candidate;
}