const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
  type: String,
  required: true,
  unique: true,
},
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "developer", "pending_developer", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User =mongoose.model("User", userSchema);
module.exports =User;