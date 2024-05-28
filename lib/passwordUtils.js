const bcrypt = require("bcryptjs");

async function generatePassword(password) {
  const hash = await bcrypt
    .hash(password, 10)
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));
  return hash;
}

async function validatePassword(password, userpassword) {
  const match = await bcrypt.compare(password, userpassword);
  console.log(match);
  return match;
}

module.exports = { generatePassword, validatePassword };
