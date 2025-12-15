require("dotenv").config();
const app = require("./app");
const db = require("./config/db");

(async () => {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("DB Connected ✅");
  } catch (err) {
    console.error("DB Error ❌", err.message);
  }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
