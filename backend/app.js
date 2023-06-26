const express = require("express");
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
const productRoutes = require("./routes/ProductRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

app.use(errorMiddleWare);

module.exports = app;
