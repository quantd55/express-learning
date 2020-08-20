const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const port = 3001;

const app = express();
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
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index", {
    name: "Express",
  });
});

app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
