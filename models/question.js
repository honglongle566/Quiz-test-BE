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
            type: DataTypes.TEXT('long'),
            get: function() { if (typeof this.getDataValue("answer")!== 'undefined')
              return JSON.parse(this.getDataValue("answer"));
            },
            set: function(value) {
              return this.setDataValue("answer", JSON.stringify(value));
            }

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
            type: DataTypes.TEXT('long'),
            get: function() { if (typeof this.getDataValue("matching_correct")!== 'undefined')
              return JSON.parse(this.getDataValue("matching_correct"));
            },
            set: function(value) {
              return this.setDataValue("matching_correct", JSON.stringify(value));
            }
        },
        matching_answers: {
            type: DataTypes.TEXT('long'),
            get: function() { if (typeof this.getDataValue("matching_answers")!== 'undefined')
              return JSON.parse(this.getDataValue("matching_answers"));
            },
            set: function(value) {
              return this.setDataValue("matching_answers", JSON.stringify(value));
            }
        },
        fill_blank_correct_answer: {
            type: DataTypes.TEXT('long'),
            get: function() { if (typeof this.getDataValue("fill_blank_correct_answer")!== 'undefined')
              return JSON.parse(this.getDataValue("fill_blank_correct_answer"));
            },
            set: function(value) {
              return this.setDataValue("fill_blank_correct_answer", JSON.stringify(value));
            }
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