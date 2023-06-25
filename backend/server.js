const app = require("./app");

const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down server due to uncaught Exception`);
  process.exit();
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log("server is running");
});

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit();
  });
});
