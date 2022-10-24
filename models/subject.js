const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) =>{
    var subject = sequelize.define('subject',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER(4)
        },
        user_id: {
            type: Sequelize.INTEGER(4)
        },
        category_id:{
            type: Sequelize.INTEGER(4)
        },
        name: { 
            type: Sequelize.INTEGER(4)
        },
        status: {
            type: Sequelize.INTEGER(2),
            defaultValue: 0
        },
        deleted: {
            type: Sequelize.INTEGER(2),
            defaultVAlue: 0
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
        timestamps: false,
    }
    );
    return subject;
}