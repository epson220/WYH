const mongoose = require("mongoose");
const mongooseAutoInc = require("mongoose-auto-increment");

const ReplySchema = new mongoose.Schema({
  reply_content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  writer: { type: String },
  board_id: { type: Number },
  comment_id: { type: Number },
});

// mongoose.connect("mongodb://localhost:27017/local", {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongooseAutoInc.initialize(mongoose.connection);

ReplySchema.plugin(mongooseAutoInc.plugin, "reply");

module.exports = mongoose.model("reply", ReplySchema);
