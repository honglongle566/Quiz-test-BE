const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var exam = sequelize.define('exam', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER(4)
        },
        user_id: {
            type: Sequelize.INTEGER(4),
        },
        subject_id: {
            type: Sequelize.INTEGER(4)
        },
        name: {
            type: Sequelize.STRING(255)
        },
        question: {
            type: Sequelize.TEXT('long')
            
        },
        time_limit: {
            type: Sequelize.INTEGER(5)
        },
        description: {
            type: Sequelize.STRING(1024)
        },
        shuffle_question: {
            type: Sequelize.INTEGER(2)
        },
        max_score: {
            type: Sequelize.INTEGER(2)
        },
        status: {
            type: Sequelize.INTEGER(2),
            defaultValue: 1
        },
        deleted: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0
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
        timestamps: false,
    }
    );
    return exam;
}