const userService = require("../services/userService");

// LOGIN
async function login(req, res) {
  try {
    const token = await userService.login(
      req.body.username,
      req.body.password
    );

    res.json({ accessToken: token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

// SIGN UP
async function signup(req, res) {
  try {
    await userService.signup(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  login,
  signup,
};
