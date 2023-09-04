const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddlerware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

const carProduct = require("./routes/carProductRoute");
app.use("api/v1", carProduct);
app.use(errorMiddlerware);

module.exports = app;
