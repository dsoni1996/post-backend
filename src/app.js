const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const postRoutes = require("./modules/post/post.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
