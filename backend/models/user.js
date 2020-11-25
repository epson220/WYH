const mongoose = require("mongoose");
const mongooseAutoInc = require("mongoose-auto-increment");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date },
  user_id: { type: Number, default: 0, unique: true },
});

// mongoose.connect("mongodb://localhost:27017/local", {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongooseAutoInc.initialize(mongoose.connection);

UserSchema.plugin(mongooseAutoInc.plugin, "user");

module.exports = mongoose.model("user", UserSchema);
