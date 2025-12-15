const db = require("../../config/db");

exports.createPost = async (userId, content) => {
  const [result] = await db.query(
    "INSERT INTO posts (user_id, content) VALUES (?, ?)",
    [userId, content]
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
