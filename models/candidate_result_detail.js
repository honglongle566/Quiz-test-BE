const { Sequelize, DataTypes } = require('sequelize');
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
    var candidate_result_detail = sequelize.define('candidate_result_detail', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER(4)
        },
        candidate_id: {
            type: Sequelize.INTEGER(4)
        },
        examination_room_id: {
            type: Sequelize.INTEGER(4)
        },
        answer_detail: {
            type: DataTypes.TEXT('long'),
            get: function() {  if (typeof this.getDataValue("answer_detail") !== 'undefined')
              return JSON.parse(this.getDataValue("answer_detail"));
            },
            set: function(value) {
              return this.setDataValue("answer_detail", JSON.stringify(value));
            }
        },
        time_start: {
            type: Sequelize.DATE,
            // get() {
            //     return moment(this.getDataValue("time_start")).utcOffset('+0700').format('YYYY-MM-DD HH:mm');
            // },

            
        },
        time_end: {
            type: Sequelize.DATE,
            // get() {
            //     return moment(this.getDataValue("time_start")).utcOffset('+0700').format('YYYY-MM-DD HH:mm');
            // },

            
        },
        score: {
            type: Sequelize.INTEGER(4)
        },
        max_score: {
            type: Sequelize.INTEGER(4)
        },
        total_right: {
            type: Sequelize.INTEGER(4)
        },
        total_question:{
            type: Sequelize.INTEGER(4)
        },
        status: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0
        },
        percent:{
            type: Sequelize.INTEGER(4),
            defaultValue: 0,
        },
        result:{
            type: Sequelize.INTEGER(4),
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
    return candidate_result_detail;
}