const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth.middleware");
const postController = require("./post.controller");


router.post("/", auth, postController.createPost);
router.get("/",auth , postController.getFeed);
router.delete("/:id", auth, postController.deletePost);
router.put("/:id", auth, postController.updatePost);

module.exports = router;
