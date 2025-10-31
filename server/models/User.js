const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple regex for email validation
      "Please enter a valid email address",
    ],
  },
  password: { type: String, required: [true, "Password is required"] },
});

module.exports = mongoose.model("User", userSchema);
