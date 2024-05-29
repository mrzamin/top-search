require("dotenv").config();
const connection = process.env.DB_STRING;
const mongoDB = connection;
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

module.exports = connection;
