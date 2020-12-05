const mongoose = require("mongoose");
const mongooseAutoInc = require("mongoose-auto-increment");

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  hobby: { type: String },
  created_at: { type: Date, default: Date.now },
  picture: { type: String },
  writer: { type: String },
});

// mongoose.connect("mongodb://localhost:27017/local", {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongooseAutoInc.initialize(mongoose.connection);

BoardSchema.plugin(mongooseAutoInc.plugin, "board");

module.exports = mongoose.model("board", BoardSchema);
