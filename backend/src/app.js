const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const auditRoutes = require("./routes/audit");

function getMongoUri() {
  if (!process.env.MONGODB_URI) return "";
  return process.env.MONGODB_URI;
}

async function connectMongo() {
  const mongoUri = getMongoUri();
  if (!mongoUri) return false;
  await mongoose.connect(mongoUri);
  return true;
}

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: false,
    })
  );
  app.use(express.json({ limit: "2mb" }));

  // Health check endpoint (used by the frontend gating).
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  // API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/audit", auditRoutes);

  // Basic error handler
  app.use((err, _req, res, _next) => {
    // eslint-disable-next-line no-console
    console.error("[backend] error:", err?.message || err);
    res.status(500).json({ ok: false, message: "Server error" });
  });

  // Connect Mongo lazily on app start.
  // If it fails, health remains OK, but auth/audit will fail accordingly.
  connectMongo().catch((err) => {
    // eslint-disable-next-line no-console
    console.error("[backend] Mongo connect failed:", err?.message || err);
  });

  return app;
}

module.exports = { createApp };

