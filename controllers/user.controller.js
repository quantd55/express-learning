const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
};

module.exports.search = (req, res) => {
  var keyword = req.query.q;
  var result = db
    .get("users")
    .value()
    .filter((user) => {
      return user.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });
  res.render("users/index", {
    users: result,
    q: keyword,
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.view = (req, res) => {
  var id = req.params.userId;
  var user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user,
  });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  let errors = [];
  if (!req.body.name) {
    errors.push("Name is required.");
  }

  if (!req.body.phone) {
    errors.push("Phone is required.");
  }

  if (errors.length) {
    res.render("users/create", { errors: errors, user: req.body });
    return;
  }
  db.get("users").push(req.body).write();
  res.redirect("/users/create");
};