const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var question = sequelize.define('question', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER(4)
        },
        user_id: {
            type: Sequelize.INTEGER(4)
        },
        group_question_id: {
            type: Sequelize.INTEGER(4)
        },
        name: {
            type: Sequelize.STRING(1024)
        },
        type: {
            type: Sequelize.INTEGER(1)
        },
        note_answer: {
            type: Sequelize.STRING
        },
        answer: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.INTEGER(2)
        },
        correct_answer: {
            type: Sequelize.STRING
        },
        has_mul_correct_answers: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0,
        },
        matching_correct: {
            type: Sequelize.STRING
        },
        matching_answers: {
            type: Sequelize.STRING
        },
        fill_blank_correct_answer: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER(2),
            defaultValue: 1,
        },
        deleted: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0
        },
        creted_date: {
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
    });
    return question;
}