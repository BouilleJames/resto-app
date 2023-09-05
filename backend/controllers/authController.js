const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const register = async (req, res) => {
  try {
    console.log("Received registration request:", req.body);
    const { login, password, role } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed password:", hashedPassword);

    await User.create({
      login: login,
      password: hashedPassword,
      role: role,
    });

    console.log("User registered successfully");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      where: { login: login },
    });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    console.log("Role:", user.role);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = {
  register,
  login,
};
