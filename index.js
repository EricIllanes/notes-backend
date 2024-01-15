const express = require("express");
const { sequelize } = require("./db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

// require('./src/models/Users')
require("./src/models/Tags");
require("./src/models/Notes");
const app = express();

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//routes
app.use(require("./src/routes/index"));

async function connect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully *~* ");
    app.listen(3000);
    console.log("Servidor on port 3000");
  } catch (error) {
    console.error("Unable to connect to the database :c", error);
  }
}

connect();
