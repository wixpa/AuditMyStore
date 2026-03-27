const mongoose = require("mongoose");

const AnonymousEmailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    storeOrigin: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnonymousEmail", AnonymousEmailSchema);

