"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require('./../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    operatorsAliases: false,
    timezone: "+07:00",

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.examination_room = require('./examination_room')(sequelize, Sequelize);


// db.user.sync({force: true});
// db.examination_room.sync({force:true});


module.exports = db