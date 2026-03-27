const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

function signToken(payload) {
  const secret = process.env.JWT_SECRET || "";
  if (!secret) throw new Error("JWT_SECRET not configured");
  return jwt.sign(payload, secret, { expiresIn: "30d" });
}

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    const trimEmail = (email || "").trim().toLowerCase();

    if (!name || !name.trim()) {
      return res.status(400).json({ ok: false, message: "Name is required." });
    }
    if (!trimEmail) {
      return res.status(400).json({ ok: false, message: "Email is required." });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ ok: false, message: "Password must be at least 6 characters." });
    }

    const existing = await User.findOne({ email: trimEmail });
    if (existing) {
      return res.status(409).json({ ok: false, message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: trimEmail,
      passwordHash,
    });

    const token = signToken({ id: user._id.toString(), email: user.email, name: user.name });
    return res.json({
      ok: true,
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[backend] signup error:", err?.message || err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const trimEmail = (email || "").trim().toLowerCase();
    if (!trimEmail || !password) {
      return res.status(400).json({ ok: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email: trimEmail });
    if (!user) return res.status(401).json({ ok: false, message: "Invalid email or password." });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ ok: false, message: "Invalid email or password." });

    const token = signToken({ id: user._id.toString(), email: user.email, name: user.name });
    return res.json({
      ok: true,
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[backend] login error:", err?.message || err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

const { requireAuth } = require("../middleware/auth");

router.get("/me", requireAuth, async (req, res) => {
  try {
    const payload = req.user || {};
    const user = await User.findOne({ email: payload.email });
    if (!user) return res.status(401).json({ ok: false, message: "Unauthorized" });

    return res.json({
      ok: true,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[backend] me error:", err?.message || err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

module.exports = router;

