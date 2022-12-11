const { Sequelize, DataTypes } = require('sequelize');

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
            exam_id: {
                type: Sequelize.INTEGER(4)
            },
            name: {
                type: Sequelize.STRING(255)
            },
            description: {
                type: Sequelize.STRING(255)
            },
            time_limit: {
                type: DataTypes.TEXT('long'),
                get: function () {
                    if (typeof this.getDataValue("time_limit") !== 'undefined')
                        return JSON.parse(this.getDataValue("time_limit"));
                },
                set: function (value) {
                    return this.setDataValue("time_limit", JSON.stringify(value));
                }
            },
            code_type: {
                type: Sequelize.INTEGER(2),
            },
            pass_mark: {
                type: Sequelize.INTEGER(3),
            },
            is_require_email: {
                type: Sequelize.INTEGER(2),
            },
            is_require_full_name: {
                type: Sequelize.INTEGER(2)
            },
            is_require_phone: {
                type: Sequelize.INTEGER(2),
            },
            is_require_group: {
                type: Sequelize.INTEGER(2),
            },
            is_require_identify_code: {
                type: Sequelize.INTEGER(2)
            },
            code_room: {
                type: Sequelize.STRING(50)
            },
            link_room_exam: {
                type: Sequelize.STRING(255)
            },
            status: {
                type: Sequelize.INTEGER(2),
                defaultValue: 0
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
    return examination_room;
}