const express = require("express");
const shortid = require("shortid");

const db = require("../db");

const router = express.Router();
router.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
});

router.get("/search", (req, res) => {
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
});

router.get("/create", (req, res) => {
  res.render("users/create");
});

router.get("/:userId", (req, res) => {
  var id = req.params.userId;
  var user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user,
  });
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users/create");
});

module.exports = router;
