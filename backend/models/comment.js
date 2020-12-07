const mongoose = require("mongoose");
const mongooseAutoInc = require("mongoose-auto-increment");

const CommentSchema = new mongoose.Schema({
  input: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  writer: { type: String },
  board_id: { type: Number },
});

// mongoose.connect("mongodb://localhost:27017/local", {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongooseAutoInc.initialize(mongoose.connection);

CommentSchema.plugin(mongooseAutoInc.plugin, "comment");

module.exports = mongoose.model("comment", CommentSchema);
