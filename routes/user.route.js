const express = require("express");
const validate = require("../validate/user.validate");

const controller = require("../controllers/user.controller");

const router = express.Router();
router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:userId", controller.view);

router.post("/create", validate.postCreate, controller.postCreate);

module.exports = router;
