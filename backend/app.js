const express = require("express");
const errorMiddleWare = require("./middleware/error");

const app = express();

app.use(express.json());

const productRoutes = require("./routes/ProductRoutes");

app.use("/api/v1", productRoutes);

app.use(errorMiddleWare);

module.exports = app;
