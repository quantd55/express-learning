const db = require("../db");

module.exports.login = (req, res, next) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = db.get("users").find({ email }).value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist"],
      user: req.body,
    });
    return;
  }

  if (user.password !== password) {
    res.render("auth/login", {
      errors: ["Login fail!"],
      user: req.body,
    });
    return;
  }
  res.cookie("userid", user.id);
  res.redirect("/users");
};
