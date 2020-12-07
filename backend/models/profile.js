const mongoose = require("mongoose");
const mongooseAutoInc = require("mongoose-auto-increment");

const ProfileSchema = new mongoose.Schema({
  profile_photo: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  self_intro: { type: String },
  user_id: { type: Number },
  user_email: { type: String },
  age: { type: Number },
  location: { type: String },
});

// mongoose.connect("mongodb://localhost:27017/local", {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongooseAutoInc.initialize(mongoose.connection);

ProfileSchema.plugin(mongooseAutoInc.plugin, "profile");

module.exports = mongoose.model("profile", ProfileSchema);
