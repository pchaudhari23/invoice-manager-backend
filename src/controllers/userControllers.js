require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDb = require("../config/database").getDb;

// LOGIN
async function login(req, res) {
  try {
    const db = getDb();
    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    const payload = { username: user.username, id: user._id };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    if (match) {
      res.json({ accessToken });
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// SIGN UP
async function signup(req, res) {
  try {
    const db = getDb();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    };

    const result = await db.collection("users").insertOne(user);
    res.send(result);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error during signup" });
  }
}

module.exports = {
  login,
  signup,
};
