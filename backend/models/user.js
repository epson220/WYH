const mongoose = require("mongoose");
const mongooseAutoInc = require("mongoose-auto-increment");

let UserSchma = new mongoose.Schema({
  email: { type: String, default: "", required: true, unique: true },
  password: { type: String, required: true, default: "" },
  name: { type: String, index: "hashed", default: "" },
  created_at: { type: Date, index: { unique: false }, default: Date.now },
  deleted_at: { type: Date, index: { unique: false } },
});

movieSchema.plugin(mongooseAutoInc.plugin, "user");

module.exports = mongoose.model("user", userSchema);
