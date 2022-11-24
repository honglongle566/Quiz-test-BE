const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(4)
      },
      google_id: {
        type: Sequelize.STRING(255)
      },
      facebook_id: {
        type: Sequelize.STRING(255)
      },
      role: {
        type: Sequelize.INTEGER(2),
        defaultValue: true
      },
      status: {
        defaultValue: 0,
        type: Sequelize.INTEGER(2)
      },
      full_name: {
        type: Sequelize.STRING(255)
      },
      user_name: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(15)
      },
      password: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.INTEGER(2)
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      avatar: {
        type: Sequelize.STRING(1024)
      },
      token: {
        type: Sequelize.STRING(255)
      },
      reset_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      expires: {
        type: Sequelize.DATE,
      },
      expires_reset_token: {
        type: Sequelize.DATE,
      },
      nation: {
        type: Sequelize.STRING(255)
      },
      deleted: {
        defaultValue: 0,
        type: Sequelize.INTEGER(2)
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
      },
      updated_by: {
        type: Sequelize.STRING(255)
      },
    },
    {
      timestamps: false,
    }
  );
  return user;
};
