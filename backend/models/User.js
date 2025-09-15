const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["expert", "startup", "institution", "admin"],
      required: true,
    },
    skills: [String],
    experience: String,
    availability: String,
    embedding: { type: Array },
    rating: { type: Number, default: 0 },
    feedbacks: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
