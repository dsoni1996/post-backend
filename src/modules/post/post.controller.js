const postService = require("./post.service");

exports.createPost = async (req, res) => {
  const { content } = req.body;

  const postId = await postService.createPost(
    req.user.id,
    content
  );

  res.status(201).json({
    success: true,
    message: "Post created",
    postId
  });
};

exports.getFeed = async (req, res) => {
  const posts = await postService.getFeed();

  res.json({
    success: true,
    data: posts
  });
};
