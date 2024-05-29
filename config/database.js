require("dotenv").config();

const connection = process.env.DB_STRING;
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = connection;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

module.exports = connection;
