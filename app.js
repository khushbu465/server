const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const app = express();

app.use(cors());
dotenv.config();

//Database Connection
connectDB();

const indexRouter = require("./routes/index");
const dutyRouter = require("./routes/duty");
const crewRouter = require("./routes/crew");
const vehicleRouter = require("./routes/vehicle");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", dutyRouter);
app.use("/api", crewRouter);
app.use("/api", vehicleRouter);


app.listen(process.env.PORT, () =>
  console.log("App listening on port " + process.env.PORT)
);

module.exports.handler = app;
