const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
};

module.exports.search = (req, res) => {
  let keyword = req.query.q;
  let result = db
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
  console.log(req.cookies);
  res.render("users/create");
};

module.exports.view = (req, res) => {
  let id = req.params.userId;
  let user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user,
  });
};

module.exports.postCreate = (req, res) => {
  //   console.log(res.locals);
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split("\\").slice(1).join("\\");
  db.get("users").push(req.body).write();
  res.redirect("/users/");
};
