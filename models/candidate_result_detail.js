const {Sequelize ,DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var candidate_result_detail = sequelize.define('candidate_result_detail',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER(4) 
        },
        candidate_id: {
            type: Sequelize.INTEGER(4)
        },
        examination_room_id:{
            type: Sequelize.INTEGER(4)
        },
        answer_detail: {
            type: Sequelize.STRING
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
        created_by:{
            type: Sequelize.STRING(255)
        },
        updated_date: { 
            type: Sequelize.STRING(255),
            defaultValue: DataTypes.NOW
        },
        updated_by: {
            type: Sequelize.STRING(255)
        }
    },{
        timestamps: false
    });
    return candidate_result_detail;
}