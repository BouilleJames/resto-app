const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../server").connection;

const registerUser = async (req, res) => {
  try {
    const { login, password, role } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await connection.query(
      "INSERT INTO users (login, password, role) VALUES (?, ?, ?)",
      [login, hashedPassword, role]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const [user] = await connection.query(
      "SELECT * FROM users WHERE login = ?",
      [login]
    );

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
