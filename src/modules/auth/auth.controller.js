const authService = require("./auth.service");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const userId = await authService.registerUser(
    name,
    email,
    password
  );

  res.status(201).json({
    success: true,
    message: "User registered",
    userId
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const token = await authService.loginUser(email, password);

  res.json({
    success: true,
    token
  });
};
