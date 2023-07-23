const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => console.log(`mongodb connected ::${data.connection.host}`));
};

module.exports = connectDatabase;

/* git remote add origin https://github.com/Chirag550/MERN-ECOMMERCE.git
git branch -M main
git push -u origin main */

// "proxy": "http://192.168.1.7:4000"
// "proxy": "http://192.168.137.1:4000"
