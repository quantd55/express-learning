require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const prodRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");

const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

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
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get("/", (req, res) => {
  res.render("index", {
    name: "Express",
  });
});

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/products", authMiddleware.requireAuth, prodRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
