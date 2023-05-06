const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "User name is required!"],
  },
  email: { type: String, required: [true, "Email is required!"] },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
});

const user = mongoose.model("users", userSchema);

module.exports = user;
