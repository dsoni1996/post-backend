const postService = require("./post.service");

// exports.createPost = async (req, res) => {
//   const { content } = req.body;

//   const postId = await postService.createPost(
//     req.user.id,
//     content
//   );

//   res.status(201).json({
//     success: true,
//     message: "Post created",
//     postId
//   });
// };

exports.createPost = async (req, res) => {
  const { title, content, campaign_id, ai_score, status } = req.body;

  const postId = await postService.createPost(
    req.user.id,
    title,
    content,
    campaign_id,
    ai_score,
    status
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

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    await postService.deletePostById(postId, userId);

    res.json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message
    });
  }
};


// exports.updatePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const userId = req.user.id;
//     const { content } = req.body;

//     await postService.updatePostById(postId, userId, content);

//     res.json({
//       success: true,
//       message: "Post updated successfully"
//     });

//   } catch (error) {
//     res.status(403).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  await postService.updatePost(postId, userId, req.body);

  res.json({ success: true, message: "Post updated" });
};



