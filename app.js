const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const createError = require("http-errors");
const cors = require("cors");
const path = require("path");


app.use(cors());
require("dotenv").config();
const port = process.env.PORT ;
app.use(express.static("public"));
app.use(cors());
// const initializePassport= require('./config/passportConfig');
// initializePassport(passport);
const route = require("./api/routes");
const { sequelize } = require("./models");
const http =require ("http");
// socket.io
/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", async() => {
  console.log(`Listening on port http://localhost:${port}`);
  try{
    await sequelize;
    console.log("Connection DB has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parse request data  content type
// Enable CORS from client-side
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(morgan("combined"));


// Route init
// route(app);
app.use(route);


app.get("/", async (req, res, next) => {
  res.send("Welcome to Quiz-Test");
});

app.use(express.static(path.join(__dirname, "/")));