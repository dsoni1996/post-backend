const db = require("../../config/db");


exports.createPost = async (
  userId,
  title,
  content,
  campaignId,
  aiScore,
  status
) => {
  const [result] = await db.query(
    `INSERT INTO posts 
     (user_id, content, title, campaign_id, ai_score, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, content, title, campaignId, aiScore, status]
  );

  return result.insertId;
};

exports.getFeed = async () => {
  const [rows] = await db.query(`
    SELECT 
      p.id,
      p.content,
      u.name,
      p.created_at
    FROM posts p
    JOIN users u ON u.id = p.user_id
    ORDER BY p.created_at DESC
  `);

  return rows;
};


exports.deletePostById = async (postId, userId) => {
  const [[post]] = await db.query(
    "SELECT id, user_id FROM posts WHERE id = ?",
    [postId]
  );

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user_id !== userId) {
    throw new Error("Unauthorized to delete this post");
  }

  await db.query(
    "DELETE FROM posts WHERE id = ?",
    [postId]
  );

  return true;
};


exports.updatePost = async (postId, userId, data) => {
  const [result] = await db.query(
    `UPDATE posts SET title=?, description=?, ai_score=?, status=?
     WHERE id=? AND user_id=?`,
    [
      data.title,
      data.content,
      data.ai_score,
      data.status,
      postId,
      userId
    ]
  );

  if (result.affectedRows === 0) {
    throw new Error("Unauthorized or post not found");
  }
};
