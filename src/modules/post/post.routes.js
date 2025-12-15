const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth.middleware");
const postController = require("./post.controller");

router.post("/", auth, postController.createPost);
router.get("/", postController.getFeed);

module.exports = router;
