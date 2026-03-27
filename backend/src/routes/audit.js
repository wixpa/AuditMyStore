const express = require("express");

const AnonymousEmail = require("../models/AnonymousEmail");

const router = express.Router();

router.post("/anonymous-email", async (req, res) => {
  try {
    const { email, storeOrigin } = req.body || {};
    const trimEmail = (email || "").trim().toLowerCase();
    if (!trimEmail) {
      return res.status(400).json({ ok: false, message: "Email is required." });
    }

    // Very lightweight email validation: frontend already validates format.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimEmail)) {
      return res.status(400).json({ ok: false, message: "Invalid email format." });
    }

    await AnonymousEmail.updateOne(
      { email: trimEmail },
      { $set: { email: trimEmail, storeOrigin: storeOrigin || "" } },
      { upsert: true }
    );

    return res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[backend] anonymous-email error:", err?.message || err);
    // If DB not connected yet, this will fail; treat as server error.
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

module.exports = router;

