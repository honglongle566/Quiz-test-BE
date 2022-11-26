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
db.exam = require('./exam')(sequelize, Sequelize);
db.category = require('./category')(sequelize, Sequelize);
db.question = require('./question')(sequelize, Sequelize);
db.group_question = require('./group_question')(sequelize, Sequelize);
db.subject = require('./subject')(sequelize, Sequelize);
db.candidate = require('./candidate')(sequelize, Sequelize);
db.candidate_result_detail = require('./candidate_result_detail')(sequelize, Sequelize);
db.notification = require('./notification')(sequelize, Sequelize);

// db.question.sync({ alter: true });
// db.examination_room.sync({ force: true });
// db.exam.sync({ force: true });
 //db.category.sync({ alter: true });
// db.question.sync({ force: true });
// db.group_question.sync({ force: true });
// db.subject.sync({ force: true });
// db.candidate.sync({ force: true });
// db.candidate_result_detail.sync({ force: true });
// db.notification.sync({ force: true });


module.exports = db