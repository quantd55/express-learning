const db = require("../db");

module.exports.requireAuth = (req, res, next) => {
  if (!req.cookies.userid) {
    res.redirect("/auth/login");
    return;
  }

  let user = db.get("users").find({ id: req.cookies.userid }).value();
  if (!user) {
    res.redirect("/auth/login");
    return;
  }
  next();
};
