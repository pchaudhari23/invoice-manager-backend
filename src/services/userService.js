require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userRepository = require("../repositories/userRepository");

class UserService {
  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid credentials");
    }

    return jwt.sign(
      { id: user._id, username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  }

  async signup(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({ ...data, password: hashedPassword });
    return userRepository.create(user);
  }
}

module.exports = new UserService();
