const express = require("express");
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
const productRoutes = require("./routes/ProductRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/OrderRoute");

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

app.use(errorMiddleWare);

module.exports = app;
