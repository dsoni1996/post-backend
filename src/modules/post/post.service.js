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
      p.created_at,
      p.title,
      p.campaign_id,
      p.ai_score,
      p.status
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
  const fields = [];
  const values = [];

  if (data.title) {
    fields.push("title=?");
    values.push(data.title);
  }

  if (data.content) {
    fields.push("content=?");
    values.push(data.content);
  }

  if (data.ai_score !== undefined) {
    fields.push("ai_score=?");
    values.push(data.ai_score);
  }

  if (data.status) {
    fields.push("status=?");
    values.push(data.status);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(postId, userId);

  const [result] = await db.query(
    `UPDATE posts SET ${fields.join(", ")} WHERE id=? AND user_id=?`,
    values
  );

  if (result.affectedRows === 0) {
    throw new Error("Unauthorized or post not found");
  }
};
