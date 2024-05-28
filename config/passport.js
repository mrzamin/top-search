const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const { validatePassword } = require("../lib/passwordUtils");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// const verifyCallback = async (username, password, done) => {
//   User.findOne({ name: username })
//     .then((user1) => {
//       if (!user1) {
//         return done(null, false, { message: "Incorrect username" });
//       }

//       const isValid = validatePassword(password, user1.password);

//       if (isValid === true) {
//         return done(null, user1, { message: "Login success" });
//       } else {
//         return done(null, false, { message: "Incorrect password" });
//       }
//     })
//     .catch((err) => {
//       done(err);
//     });
// };

// const strategy = new LocalStrategy(verifyCallback);

// // Sessions and serizalization:
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
