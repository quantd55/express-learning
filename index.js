const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require("shortid");

db.defaults({ users: [] }).write();

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Express",
  });
});

app.get("/users", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
});

app.get("/users/search", (req, res) => {
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

app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.get("/users/:userId", (req, res) => {
  var id = req.params.userId;
  var user = db.get("users").find({ id: id }).value();
  res.render("users/view", {
    user: user,
  });
});

app.post("/users/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
