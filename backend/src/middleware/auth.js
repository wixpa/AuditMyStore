const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";
  if (!token) return res.status(401).json({ ok: false, message: "Missing token" });

  try {
    const secret = process.env.JWT_SECRET || "";
    if (!secret) throw new Error("JWT_SECRET not configured");

    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: err?.message || "Unauthorized" });
  }
}

module.exports = { requireAuth };

