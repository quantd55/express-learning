const express = require("express");
const app = express();
const port = 3001;
const hbs = require("express-handlebars");

var users = [
  { id: 1, name: "Thinh" },
  { id: 2, name: "Hung" },
];

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");
app.get("/", (req, res) => {
  res.render("index", {
    name: "Express",
  });
});

app.get("/users", (req, res) => {
  res.render("users/index", {
    users: users,
  });
});

app.get("/users/search", (req, res) => {
  var keyword = req.query.q;
  var result = users.filter((user) => {
    return user.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
  });
  res.render("users/index", {
    users: result,
    q: keyword,
  });
});

app.listen(port, () => {
  console.log("Running...");
});
