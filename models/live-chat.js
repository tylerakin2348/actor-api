const mongoose = require("mongoose");

const liveChatSchema = new mongoose.Schema({
   message: {
    type: String,
    required: true,
  },
  message_author: {
    type: String,
    required: true,
  },
  time_created: {
    type: Date,
    default: Date.now
  },
  time_updated: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("LiveChat", liveChatSchema);
