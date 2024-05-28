// const mongoose = require("mongoose");

require("dotenv").config();

/**
 * -------------- DATABASE ----------------
 */
const connection = process.env.DB_STRING;
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = connection;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

// const conn = process.env.DB_STRING;

// const connection = mongoose.createConnection(conn, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Expose the connection
module.exports = connection;
