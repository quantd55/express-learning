const express = require("express");

const validate = require("../validate/user.validate");
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
router.get("/", controller.index);

router.get("/cookie", (req, res, next) => {
  res.cookie("userid", "12345");
  res.send("hello");
});

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:userId", controller.view);

router.post("/create", validate.postCreate, controller.postCreate);

module.exports = router;
