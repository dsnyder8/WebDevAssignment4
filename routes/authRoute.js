import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/UserSchema.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

const SALT_ROUNDS = 10;
const TOKEN_TTL = "1d";

function signTokenFor(user) {
  return jwt.sign(
    { id: user._id.toString(), user_name: user.user_name },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );
}

function sanitizeUser(user) {
  const { password, ...rest } = user.toObject();
  return rest;
}

router.post("/register", async (req, res) => {
  try {
    const { user_name, email, password, phone_number } = req.body;

    if (!user_name || !email || !password || !phone_number) {
      return res.status(400).json({
        error: "user_name, email, password, and phone_number are all required",
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      user_name,
      email,
      password: passwordHash,
      phone_number,
    });

    const token = signTokenFor(newUser);
    res.status(201).json({ user: sanitizeUser(newUser), token });
  } catch (err) {
    // Mongoose duplicate-key error (unique constraint) shows up as code 11000.
    if (err && err.code === 11000) {
      return res.status(400).json({ error: "user_name, email, or phone_number already in use" });
    }
    res.status(400).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Same response for "no user" and "wrong password" to avoid leaking which is which.
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signTokenFor(user);
    res.json({ user: sanitizeUser(user), token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(sanitizeUser(user));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
